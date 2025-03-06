import { addHours, format, parseISO, subHours } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export const formatarData = (data: string | undefined): string => {
  
  if (!data) return '';
  
  try {

  
    const dataIso = parseISO(data);
    
    
    return format(dataIso, 'dd/MM/yyyy', { locale: ptBR });

  } catch {
    return '';
  }
};

export const formatarHora = (data: string | undefined): string => {
  
  if (!data) return '';
  
  try {
    
    
    const dataIso = parseISO(data);
    
  
    const dataTZ = addHours(dataIso, 3);

    
    return format(dataTZ, 'HH:mm', { locale: ptBR });

  } catch {
    return '';
  }
};

export const formatarDataCompleta = (data: string | undefined): string => {
  if (!data) return '';
  
  try {
    
    const dataIso = parseISO(data);
    
    
    const dataTZ = addHours(dataIso, 3);

  
    return format(dataTZ, 'dd/MM/yyyy HH:mm', { locale: ptBR });
  } catch (error) {
    console.error('Erro ao formatar data:', error);
    return '';
  }
};


export const formatarDataInputDateTime = (data: string | undefined): string => {
  if (!data) return '';
  
  try {
    
    if (data.includes('T')) {

    
      const [dataParte] = data.split('.');
      return dataParte;
    }
    
   
    const date = new Date(data);

    return format(date, "yyyy-MM-dd'T'HH:mm");

  } catch (error) {
    console.error('Erro ao formatar data para input:', error);
    return '';
  }
};


export const formatarDataSubmit = (data: string, foiAlterada: boolean): string => {
  if (!data) return '';
  
  try {
    
    
    if (!foiAlterada) {
      return data;
    }

 
    const localDate = new Date(data);

  
    const dataAjustada = subHours(localDate, 3);

   
    return dataAjustada.toISOString();

  } catch (error) {
    console.error('Erro ao formatar data para envio:', error);
    return '';
  }
};