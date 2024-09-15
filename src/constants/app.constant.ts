/**
 * The AppConstants file contains all the constants
 * used throughout the application
 */
export class AppConstants {
  static readonly LEAVE_STATUS = {
    PENDING: 'PENDING',
    APPROVED: 'APPROVED',
    DENIED: 'DENIED',
  };
  static readonly PARTNER_NOT_FOUND_ERROR = 'Partner not found';
  static readonly LEAVE_OVERLAP_ERROR: 'Leave overlaps with existing leave';
}
