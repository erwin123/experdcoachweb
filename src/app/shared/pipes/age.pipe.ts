import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'age'
})
export class AgePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    const birthDate = new Date(value);

    if (!value) {
      return 0;
    }

    const now = new Date();

    let years = (now.getFullYear() - birthDate.getFullYear());

    if (now.getMonth() < birthDate.getMonth() ||
      now.getMonth() === birthDate.getMonth() && now.getDate() < birthDate.getDate()) {
      years--;
    }

    return years;
  }

}
