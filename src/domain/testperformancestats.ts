import { DateTime } from "ionic-angular";
/**
 * Interface describing the performance stats fields
 */
export interface TestPerformanceStats {
  Time:DateTime;
  Performance: number; // ms
  Status: number; // http status code
}