import { Pipe, PipeTransform } from '@angular/core';

// Pipe used to display the full gender name according to the received gender acronym, or a dash if it is an invalid gender acronym.
@Pipe({
  name: 'gender'
})
export class GenderPipe implements PipeTransform {

  transform(gender: string | null | undefined): string {
    if (gender === "M") return "Masculino"
    if (gender === "F") return "Feminino"
    return "-"
  }
 
}
