import { Pipe, PipeTransform } from '@angular/core';

// Pipe used to treat empty data received from the API, displaying a dash instead, or another provided string (blankOutput)
@Pipe({
  name: 'emptyDash'
})
export class EmptyDashPipe implements PipeTransform {

  transform(value: string | null | undefined, blankOutput: string = "-"): string {
    if (!value) return blankOutput
    return value;
  }

}
