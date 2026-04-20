-- Create an atomic RPC function to scan tickets securely
create or replace function update_ticket_status_atomic(qr_ticket_id uuid, scanner_uid uuid)
returns json
language plpgsql
security definer
as $$
declare
  v_ticket record;
  v_scanner_role public.user_role;
begin
  -- 1. Check if the user executing has 'scanner' or 'organizer' role
  select role into v_scanner_role from public.profiles where id = scanner_uid;
  if not found or v_scanner_role not in ('scanner', 'organizer') then
    return json_build_object('success', false, 'error', 'No autorizado para escanear.');
  end if;

  -- 2. Lock the ticket row for update (to prevent Double-Scanning race conditions)
  select * into v_ticket 
  from public.tickets 
  where id = qr_ticket_id 
  for update; -- This locks the row

  if not found then
    return json_build_object('success', false, 'error', 'TICKET INEXISTENTE');
  end if;

  -- 3. Check status
  if v_ticket.status = 'scanned' then
    return json_build_object('success', false, 'error', 'TICKET YA FUE ESCANEADO (RECHAZADO)');
  end if;

  if v_ticket.status = 'transferred' then
    return json_build_object('success', false, 'error', 'TICKET FUE TRANSFERIDO (INVÁLIDO)');
  end if;

  if v_ticket.status = 'cancelled' then
    return json_build_object('success', false, 'error', 'TICKET CANCELADO');
  end if;

  -- 4. Mark as scanned
  update public.tickets 
  set status = 'scanned'::public.ticket_status 
  where id = qr_ticket_id;

  -- 5. Return success info
  return json_build_object('success', true, 'message', 'ACCESO PERMITIDO');
end;
$$;
