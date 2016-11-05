import {Pipe, PipeTransform} from "angular2/core";
import {Test} from "../domain/test";

/**
 * Simple pipe that orders the tests by status and name.
 * The broken tests are shown at the top.
 *
 * @author R. Sonke
 */
@Pipe({
  name: "sortTest"
})
export class SortTestPipe implements PipeTransform {

  public transform(array:Array<Test>, args:Array<string>):Array<Test> {
    if (!array) return array;

    array = this.filterResults(array, args);
    array = this.sortResults(array);

    return array;
  }

  private filterResults(array:Array<Test>, args:Array<string>):Array<Test> {
    if (args && args.length > 0) {

      let filterQuery = args[0].toLowerCase();
      let filterStatus = args[1];

      array = array.filter((item:Test) => {
        if (filterStatus == "all" || filterStatus.toLowerCase() == item.Status.toLowerCase() || (filterStatus == "paused" && item.Paused)) {
          // check for a match on name or url
          // in any way, case insensitive
          if (item.WebsiteName.toLowerCase().indexOf(filterQuery) !== -1) {
            return true;
          }
          if (filterQuery.length == 0) {
            return true;
          }
        }
        return false;
      });
    }
    return array;
  }

  private sortResults(array:Array<Test>):Array<Test> {
    array.sort((a:Test, b:Test) => {
      if (a == null) return -1;
      if (b == null) return 1;

      if (a.Status == "Down" && b.Status == "Down") {
        return a.WebsiteName.localeCompare(b.WebsiteName);
      }
      if (a.Status == "Down") return -1;
      if (b.Status == "Down") return 1;

      return a.WebsiteName.localeCompare(b.WebsiteName);
    });
    return array;
  }
}