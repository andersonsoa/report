
function sum(value, amount) {
  return '' + (value + amount);
}

function currentDate() {
  return formatDate(new Date());
}

function formatDate(date) {
  let config = {
    day: '2-digit',
    month: "2-digit",
    year: 'numeric',
    timeZone: typeof date === 'string' ? 'utc' : 'America/Manaus'
  }

  return new Date(date).toLocaleDateString('pt-br', config);
}

function moneyMask(val) {
  if (!val) return 'R$ 0,00';

  return new Intl.NumberFormat('pt-br', {
    style: 'currency',
    currency: 'BRL',
  }).format(val);
}

function cpfMask(cpf) {
  let c = cpf.replace(/[.-]/g, '');
  return c.replace(/(\d{3})?(\d{3})?(\d{3})?(\d{2})/, '$1.***.***-$4');
}

function toUppercase(str) {
  return str?.toLocaleUpperCase() ?? '';
}