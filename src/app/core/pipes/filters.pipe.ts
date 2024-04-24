import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filters',
  standalone: true,
})
export class FiltersPipe implements PipeTransform {
  transform(values: any[], args: string[]): any[] {
    if (!Array.isArray(values)) {
      return values;
    }

    const [query, ...properties]: string[] = args;

    if (query === '' || query.length < 3) return values;

    const lowerQuery = query.toLowerCase();
    const dateQuery = new Date(query);

    if (!isNaN(dateQuery.getTime())) {
      return values.filter((item: any) =>
        properties.flat()
          .some((property: string) =>
              item[property] instanceof Date &&
              item[property].toDateString() === dateQuery.toDateString()
          )
      );
    }

    return values.filter((item: any) =>
      properties
        .flat()
        .some((property: string) =>
          item[property].toLowerCase().includes(lowerQuery)
        )
    );
  }
}
