/**
 * Wikipedia API Service
 * Servicio para consultar artículos de física en Wikipedia (español)
 * 100% GRATIS - Sin límite de requests
 */

interface WikipediaSearchResult {
  title: string;
  pageid: number;
  snippet: string;
}

interface WikipediaContent {
  title: string;
  extract: string;
  url: string;
  thumbnail?: string;
}

/**
 * Buscar artículos en Wikipedia
 */
export async function searchWikipedia(query: string): Promise<WikipediaSearchResult[]> {
  try {
    const url = new URL('https://es.wikipedia.org/w/api.php');
    url.searchParams.append('action', 'query');
    url.searchParams.append('list', 'search');
    url.searchParams.append('srsearch', query);
    url.searchParams.append('format', 'json');
    url.searchParams.append('origin', '*');
    url.searchParams.append('srlimit', '5');

    const response = await fetch(url.toString());
    const data = await response.json();

    return data.query?.search || [];
  } catch (error) {
    console.error('Error searching Wikipedia:', error);
    return [];
  }
}

/**
 * Obtener contenido completo de un artículo
 */
export async function getWikipediaContent(title: string): Promise<WikipediaContent | null> {
  try {
    const url = new URL('https://es.wikipedia.org/w/api.php');
    url.searchParams.append('action', 'query');
    url.searchParams.append('titles', title);
    url.searchParams.append('prop', 'extracts|pageimages');
    url.searchParams.append('exintro', 'true');
    url.searchParams.append('explaintext', 'true');
    url.searchParams.append('format', 'json');
    url.searchParams.append('origin', '*');
    url.searchParams.append('piprop', 'thumbnail');
    url.searchParams.append('pithumbsize', '400');

    const response = await fetch(url.toString());
    const data = await response.json();

    const pages = data.query?.pages;
    const pageId = Object.keys(pages)[0];
    const page = pages[pageId];

    if (!page || page.missing) {
      return null;
    }

    return {
      title: page.title,
      extract: page.extract || 'No hay contenido disponible.',
      url: `https://es.wikipedia.org/wiki/${encodeURIComponent(page.title)}`,
      thumbnail: page.thumbnail?.source
    };
  } catch (error) {
    console.error('Error fetching Wikipedia content:', error);
    return null;
  }
}

/**
 * Obtener definición rápida (primeros 2-3 párrafos)
 */
export async function getWikipediaDefinition(term: string): Promise<string | null> {
  try {
    const content = await getWikipediaContent(term);
    if (!content) return null;

    // Tomar solo los primeros 500 caracteres
    const shortExtract = content.extract.substring(0, 500);
    const lastPeriod = shortExtract.lastIndexOf('.');
    
    return lastPeriod > 0 
      ? shortExtract.substring(0, lastPeriod + 1)
      : shortExtract + '...';
  } catch (error) {
    console.error('Error fetching Wikipedia definition:', error);
    return null;
  }
}

/**
 * Términos de física relacionados con el proyecto
 */
export const physicsTopics = {
  fuerzas: [
    'Fuerza',
    'Vector (matemáticas)',
    'Sistema de fuerzas',
    'Fuerza resultante',
    'Equilibrio mecánico',
    'Descomposición de fuerzas'
  ],
  colineales: [
    'Fuerza colineal',
    'Línea de acción',
    'Composición de fuerzas'
  ],
  paralelas: [
    'Fuerzas paralelas',
    'Centro de gravedad',
    'Cupla (física)',
    'Par de fuerzas'
  ],
  momentos: [
    'Momento de fuerza',
    'Torque',
    'Brazo de palanca',
    'Teorema de Varignon'
  ],
  equilibrio: [
    'Equilibrio de fuerzas',
    'Condiciones de equilibrio',
    'Diagrama de cuerpo libre',
    'Primera ley de Newton'
  ],
  concurrentes: [
    'Fuerzas concurrentes',
    'Método del paralelogramo',
    'Método del polígono',
    'Resolución de vectores'
  ],
  maquinas: [
    'Máquina simple',
    'Palanca',
    'Polea',
    'Plano inclinado',
    'Ventaja mecánica'
  ]
};