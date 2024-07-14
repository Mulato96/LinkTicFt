import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'formatCurrency' })
export class FormatCurrencyPipe implements PipeTransform {
    transform(value: number): string {
        // Formatear el valor sin ceros decimales y sin separador de miles
        return value.toLocaleString('es-CO', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
    }
}
