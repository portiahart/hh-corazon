export interface Quote {
  text: string;
  author: string;
  category: string;
}

const CATEGORY_ORDER = [
  'NÚMEROS Y MATEMÁTICAS',
  'CONTABILIDAD Y DINERO',
  'ORDEN Y DISCIPLINA',
  'PACIENCIA Y PERSEVERANCIA',
  'FILOSOFÍA BUDISTA Y ORIENTAL',
  'VERDAD E INTEGRIDAD',
  'CONOCIMIENTO Y SABIDURÍA',
  'TRABAJO Y EXCELENCIA',
  'HOSPITALIDAD Y SERVICIO',
  'PROVERBIOS COLOMBIANOS Y LATINOS',
];

const quotes: Quote[] = [
  // — NÚMEROS Y MATEMÁTICAS —
  { text: "Los números son la lengua en la que Dios escribió el universo.", author: "Galileo Galilei", category: "NÚMEROS Y MATEMÁTICAS" },
  { text: "Las matemáticas son la música de la razón.", author: "James Joseph Sylvester", category: "NÚMEROS Y MATEMÁTICAS" },
  { text: "Mide lo que es medible y haz medible lo que no lo es.", author: "Galileo Galilei", category: "NÚMEROS Y MATEMÁTICAS" },
  { text: "Sin datos, solo eres otra persona con una opinión.", author: "W. Edwards Deming", category: "NÚMEROS Y MATEMÁTICAS" },
  { text: "Lo que se mide, se mejora.", author: "Peter Drucker", category: "NÚMEROS Y MATEMÁTICAS" },
  { text: "La esencia de las matemáticas no es hacer las cosas simples complicadas, sino hacer las cosas complicadas simples.", author: "Stan Gudder", category: "NÚMEROS Y MATEMÁTICAS" },
  { text: "Las matemáticas son el alfabeto con el que Dios escribió el mundo.", author: "Galileo Galilei", category: "NÚMEROS Y MATEMÁTICAS" },
  { text: "En Dios confiamos; todos los demás deben traer datos.", author: "W. Edwards Deming", category: "NÚMEROS Y MATEMÁTICAS" },
  { text: "Los números no mienten, pero los mentirosos usan números.", author: "Mark Twain", category: "NÚMEROS Y MATEMÁTICAS" },
  { text: "No todo lo que se puede contar cuenta, y no todo lo que cuenta se puede contar.", author: "William Bruce Cameron", category: "NÚMEROS Y MATEMÁTICAS" },

  // — CONTABILIDAD Y DINERO —
  { text: "La contabilidad es la poesía de los negocios.", author: "Anónimo", category: "CONTABILIDAD Y DINERO" },
  { text: "El presupuesto es decirle a tu dinero a dónde ir, en lugar de preguntarte a dónde fue.", author: "Dave Ramsey", category: "CONTABILIDAD Y DINERO" },
  { text: "El dinero es un buen sirviente pero un mal amo.", author: "Francis Bacon", category: "CONTABILIDAD Y DINERO" },
  { text: "El que no lleva cuentas, no lleva negocio.", author: "Proverbio", category: "CONTABILIDAD Y DINERO" },
  { text: "Cuida los centavos, que los pesos se cuidan solos.", author: "Proverbio colombiano", category: "CONTABILIDAD Y DINERO" },
  { text: "La verdadera riqueza no se cuenta en monedas, sino en paz mental.", author: "Proverbio budista", category: "CONTABILIDAD Y DINERO" },
  { text: "Una inversión en conocimiento paga el mejor interés.", author: "Benjamin Franklin", category: "CONTABILIDAD Y DINERO" },
  { text: "Nunca gastes tu dinero antes de ganarlo.", author: "Thomas Jefferson", category: "CONTABILIDAD Y DINERO" },
  { text: "El hábito de ahorrar es en sí mismo una educación.", author: "George S. Clason", category: "CONTABILIDAD Y DINERO" },
  { text: "La riqueza no consiste en tener grandes posesiones, sino en tener pocas necesidades.", author: "Epicteto", category: "CONTABILIDAD Y DINERO" },

  // — ORDEN Y DISCIPLINA —
  { text: "El orden es la primera ley del cielo.", author: "Alexander Pope", category: "ORDEN Y DISCIPLINA" },
  { text: "Un lugar para cada cosa, y cada cosa en su lugar.", author: "Benjamin Franklin", category: "ORDEN Y DISCIPLINA" },
  { text: "La disciplina es el puente entre las metas y los logros.", author: "Jim Rohn", category: "ORDEN Y DISCIPLINA" },
  { text: "Organizar es lo que haces antes de hacer algo, para que cuando lo hagas no sea un caos.", author: "A. A. Milne", category: "ORDEN Y DISCIPLINA" },
  { text: "El caos es el enemigo del crecimiento.", author: "Anónimo", category: "ORDEN Y DISCIPLINA" },
  { text: "La atención a los detalles separa lo ordinario de lo extraordinario.", author: "Anónimo", category: "ORDEN Y DISCIPLINA" },
  { text: "No busques tener menos que hacer, sino ser más eficiente en lo que haces.", author: "Anónimo", category: "ORDEN Y DISCIPLINA" },
  { text: "La excelencia no es un acto, sino un hábito.", author: "Aristóteles", category: "ORDEN Y DISCIPLINA" },
  { text: "El éxito es la suma de pequeños esfuerzos repetidos día tras día.", author: "Robert Collier", category: "ORDEN Y DISCIPLINA" },
  { text: "La libertad es imposible sin disciplina.", author: "M. Scott Peck", category: "ORDEN Y DISCIPLINA" },

  // — PACIENCIA Y PERSEVERANCIA —
  { text: "La paciencia lo logra todo.", author: "Santa Teresa de Ávila", category: "PACIENCIA Y PERSEVERANCIA" },
  { text: "No importa cuán lento vayas, siempre y cuando no te detengas.", author: "Confucio", category: "PACIENCIA Y PERSEVERANCIA" },
  { text: "La paciencia y el tiempo hacen más que la fuerza y la violencia.", author: "Jean de La Fontaine", category: "PACIENCIA Y PERSEVERANCIA" },
  { text: "La constancia es la virtud por la que todas las demás virtudes dan fruto.", author: "Arturo Grafton", category: "PACIENCIA Y PERSEVERANCIA" },
  { text: "El secreto de salir adelante es comenzar.", author: "Mark Twain", category: "PACIENCIA Y PERSEVERANCIA" },
  { text: "Gota a gota se llena la copa.", author: "Proverbio español", category: "PACIENCIA Y PERSEVERANCIA" },
  { text: "La perseverancia no es una carrera larga; son muchas carreras cortas una tras otra.", author: "Walter Elliot", category: "PACIENCIA Y PERSEVERANCIA" },
  { text: "Los grandes logros requieren tiempo.", author: "David Joseph Schwartz", category: "PACIENCIA Y PERSEVERANCIA" },
  { text: "La paciencia es amarga, pero su fruto es dulce.", author: "Jean-Jacques Rousseau", category: "PACIENCIA Y PERSEVERANCIA" },
  { text: "Paso a paso se llega lejos.", author: "Proverbio", category: "PACIENCIA Y PERSEVERANCIA" },

  // — FILOSOFÍA BUDISTA Y ORIENTAL —
  { text: "Tres cosas no pueden ocultarse por mucho tiempo: el sol, la luna y la verdad.", author: "Buda", category: "FILOSOFÍA BUDISTA Y ORIENTAL" },
  { text: "El que conquista a otros es fuerte; el que se conquista a sí mismo es poderoso.", author: "Lao Tzu", category: "FILOSOFÍA BUDISTA Y ORIENTAL" },
  { text: "El viaje de mil millas comienza con un solo paso.", author: "Lao Tzu", category: "FILOSOFÍA BUDISTA Y ORIENTAL" },
  { text: "No mires hacia atrás con ira ni hacia adelante con miedo, sino alrededor con atención.", author: "James Thurber", category: "FILOSOFÍA BUDISTA Y ORIENTAL" },
  { text: "La paz viene de adentro. No la busques fuera.", author: "Buda", category: "FILOSOFÍA BUDISTA Y ORIENTAL" },
  { text: "El agua que es demasiado pura no tiene peces.", author: "Proverbio chino", category: "FILOSOFÍA BUDISTA Y ORIENTAL" },
  { text: "Cuando el alumno está listo, el maestro aparece.", author: "Proverbio budista", category: "FILOSOFÍA BUDISTA Y ORIENTAL" },
  { text: "Mejor que mil palabras huecas es una palabra que da paz.", author: "Buda", category: "FILOSOFÍA BUDISTA Y ORIENTAL" },
  { text: "El bambú que se dobla es más fuerte que el roble que resiste.", author: "Proverbio japonés", category: "FILOSOFÍA BUDISTA Y ORIENTAL" },
  { text: "Sé como el agua: fluye donde hay espacio y llena lo que está vacío.", author: "Lao Tzu", category: "FILOSOFÍA BUDISTA Y ORIENTAL" },

  // — VERDAD E INTEGRIDAD —
  { text: "La integridad es hacer lo correcto aunque nadie esté mirando.", author: "C. S. Lewis", category: "VERDAD E INTEGRIDAD" },
  { text: "La claridad es la forma más alta de cortesía.", author: "Proverbio", category: "VERDAD E INTEGRIDAD" },
  { text: "La honestidad es el primer capítulo del libro de la sabiduría.", author: "Thomas Jefferson", category: "VERDAD E INTEGRIDAD" },
  { text: "Una mentira puede viajar medio mundo mientras la verdad se pone los zapatos.", author: "Mark Twain", category: "VERDAD E INTEGRIDAD" },
  { text: "El carácter es lo que eres en la oscuridad.", author: "Dwight L. Moody", category: "VERDAD E INTEGRIDAD" },
  { text: "La confianza se construye gota a gota y se pierde a chorros.", author: "Proverbio", category: "VERDAD E INTEGRIDAD" },
  { text: "Haz lo correcto. Siempre dará fruto.", author: "Anónimo", category: "VERDAD E INTEGRIDAD" },
  { text: "La transparencia genera confianza.", author: "Anónimo", category: "VERDAD E INTEGRIDAD" },
  { text: "Quien es fiel en lo poco, también lo será en lo mucho.", author: "Lucas 16:10", category: "VERDAD E INTEGRIDAD" },
  { text: "La reputación se construye en años y se destruye en segundos.", author: "Warren Buffett", category: "VERDAD E INTEGRIDAD" },

  // — CONOCIMIENTO Y SABIDURÍA —
  { text: "La mente que se abre a una nueva idea jamás vuelve a su tamaño original.", author: "Albert Einstein", category: "CONOCIMIENTO Y SABIDURÍA" },
  { text: "Solo sé que no sé nada.", author: "Sócrates", category: "CONOCIMIENTO Y SABIDURÍA" },
  { text: "El conocimiento habla, pero la sabiduría escucha.", author: "Jimi Hendrix", category: "CONOCIMIENTO Y SABIDURÍA" },
  { text: "Aprender sin reflexionar es malgastar energía.", author: "Confucio", category: "CONOCIMIENTO Y SABIDURÍA" },
  { text: "La educación es el arma más poderosa para cambiar el mundo.", author: "Nelson Mandela", category: "CONOCIMIENTO Y SABIDURÍA" },
  { text: "El sabio no dice todo lo que piensa, pero siempre piensa todo lo que dice.", author: "Aristóteles", category: "CONOCIMIENTO Y SABIDURÍA" },
  { text: "La curiosidad es la mecha de la vela del aprendizaje.", author: "William Arthur Ward", category: "CONOCIMIENTO Y SABIDURÍA" },
  { text: "La verdadera sabiduría está en reconocer la propia ignorancia.", author: "Sócrates", category: "CONOCIMIENTO Y SABIDURÍA" },
  { text: "Leer es soñar con los ojos abiertos.", author: "Anónimo", category: "CONOCIMIENTO Y SABIDURÍA" },
  { text: "Nunca pares de aprender, porque la vida nunca para de enseñar.", author: "Anónimo", category: "CONOCIMIENTO Y SABIDURÍA" },

  // — TRABAJO Y EXCELENCIA —
  { text: "La calidad no es un acto, es un hábito.", author: "Aristóteles", category: "TRABAJO Y EXCELENCIA" },
  { text: "El trabajo duro vence al talento cuando el talento no trabaja duro.", author: "Tim Notke", category: "TRABAJO Y EXCELENCIA" },
  { text: "Haz cada detalle a la perfección y no limites el número de detalles a perfeccionar.", author: "Steve Jobs", category: "TRABAJO Y EXCELENCIA" },
  { text: "El genio es uno por ciento inspiración y noventa y nueve por ciento transpiración.", author: "Thomas Edison", category: "TRABAJO Y EXCELENCIA" },
  { text: "Trabaja en silencio; deja que tu éxito haga el ruido.", author: "Frank Ocean", category: "TRABAJO Y EXCELENCIA" },
  { text: "La diferencia entre ordinario y extraordinario es ese pequeño extra.", author: "Jimmy Johnson", category: "TRABAJO Y EXCELENCIA" },
  { text: "Escoge un trabajo que ames y no tendrás que trabajar ni un día de tu vida.", author: "Confucio", category: "TRABAJO Y EXCELENCIA" },
  { text: "No hay atajos para ningún lugar que valga la pena.", author: "Beverly Sills", category: "TRABAJO Y EXCELENCIA" },
  { text: "Primero hazlo, luego hazlo bien, luego hazlo mejor.", author: "Addy Osmani", category: "TRABAJO Y EXCELENCIA" },
  { text: "El profesionalismo es saber cómo hacerlo, cuándo hacerlo y hacerlo.", author: "Frank Tyger", category: "TRABAJO Y EXCELENCIA" },

  // — HOSPITALIDAD Y SERVICIO —
  { text: "La hospitalidad es hacer que alguien se sienta como en casa, aunque desearías que lo estuviera.", author: "Anónimo", category: "HOSPITALIDAD Y SERVICIO" },
  { text: "El servicio es el alquiler que pagas por el espacio que ocupas en este mundo.", author: "Muhammad Ali", category: "HOSPITALIDAD Y SERVICIO" },
  { text: "La gente olvidará lo que dijiste, olvidará lo que hiciste, pero nunca olvidará cómo la hiciste sentir.", author: "Maya Angelou", category: "HOSPITALIDAD Y SERVICIO" },
  { text: "Un cliente bien atendido vale más que diez por conseguir.", author: "Proverbio comercial", category: "HOSPITALIDAD Y SERVICIO" },
  { text: "La verdadera hospitalidad consiste en dar lo mejor de ti a tus huéspedes.", author: "Eleanor Roosevelt", category: "HOSPITALIDAD Y SERVICIO" },
  { text: "El detalle marca la diferencia entre lo bueno y lo memorable.", author: "Anónimo", category: "HOSPITALIDAD Y SERVICIO" },
  { text: "Servir a otros es la renta que pagamos por vivir.", author: "Marian Wright Edelman", category: "HOSPITALIDAD Y SERVICIO" },
  { text: "La excelencia en el servicio no es un destino, es un viaje.", author: "Anónimo", category: "HOSPITALIDAD Y SERVICIO" },
  { text: "Haz del cliente el héroe de tu historia.", author: "Ann Handley", category: "HOSPITALIDAD Y SERVICIO" },
  { text: "La mejor publicidad es un cliente satisfecho.", author: "Bill Gates", category: "HOSPITALIDAD Y SERVICIO" },

  // — PROVERBIOS COLOMBIANOS Y LATINOS —
  { text: "El que madruga, Dios le ayuda.", author: "Proverbio colombiano", category: "PROVERBIOS COLOMBIANOS Y LATINOS" },
  { text: "Con paciencia y calma, hasta un burro sube una palma.", author: "Proverbio colombiano", category: "PROVERBIOS COLOMBIANOS Y LATINOS" },
  { text: "A quien madruga, Dios le ayuda, pero el que se trasnocha, Dios lo escucha.", author: "Dicho colombiano", category: "PROVERBIOS COLOMBIANOS Y LATINOS" },
  { text: "Más vale pájaro en mano que cien volando.", author: "Proverbio latino", category: "PROVERBIOS COLOMBIANOS Y LATINOS" },
  { text: "El que mucho abarca, poco aprieta.", author: "Proverbio colombiano", category: "PROVERBIOS COLOMBIANOS Y LATINOS" },
  { text: "No dejes para mañana lo que puedes hacer hoy.", author: "Proverbio latino", category: "PROVERBIOS COLOMBIANOS Y LATINOS" },
  { text: "En boca cerrada no entran moscas.", author: "Proverbio colombiano", category: "PROVERBIOS COLOMBIANOS Y LATINOS" },
  { text: "Poco a poco se va lejos.", author: "Proverbio latino", category: "PROVERBIOS COLOMBIANOS Y LATINOS" },
  { text: "Más sabe el diablo por viejo que por diablo.", author: "Proverbio colombiano", category: "PROVERBIOS COLOMBIANOS Y LATINOS" },
  { text: "Cuando el río suena, piedras lleva.", author: "Proverbio colombiano", category: "PROVERBIOS COLOMBIANOS Y LATINOS" },
];

function cleanAuthor(author: string): string {
  const commaIdx = author.indexOf(', nota:');
  if (commaIdx !== -1) return author.substring(0, commaIdx);
  return author;
}

export function getDailyQuote(): Quote {
  const start = new Date(2025, 0, 1).getTime();
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const daysSinceStart = Math.floor((now.getTime() - start) / 86400000);
  const day = ((daysSinceStart % 100) + 100) % 100;

  const categoryIndex = day % 10;
  const quoteIndex = Math.floor(day / 10) % 10;

  const targetCategory = CATEGORY_ORDER[categoryIndex];
  const categoryQuotes = quotes.filter(q => q.category === targetCategory);
  const picked = categoryQuotes[quoteIndex % categoryQuotes.length];

  return { ...picked, author: cleanAuthor(picked.author) };
}
