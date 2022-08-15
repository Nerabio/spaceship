/**
 * Available transitions for StateService
 */
export const enum TransitionsEnum {
  /**
   * Universal "cancel" transition. Like cancel add new card or close error message
   */
  TR_CANCEL,

  /**
   * Universal "retry" transition. Like retry sms code.
   */
  TR_RETRY,

  /**
   * Error get bindings
   */
  TR_GET_BINDINGS_ERROR,

  /**
   * Go to add new binding screen
   */
  TR_ADD_NEW_CARD,

  /**
   * Process adding new binding
   */
  TR_ADDING_NEW_CARD,

  /**
   * Select existing binding and prepare session
   */
  TR_SELECT_EXISTING_BINDING,

  /**
   * 3D secure code entered
   */
  TR_PROCESS_3D_SECURE,

  /**
   * 3D secure code entered - adding card
   */
  TR_PROCESS_3D_SECURE_ADDING,

  /**
   * SMS code entered
   */
  TR_PROCESS_SMS_CODE,

  /**
   * Payment was processed without confirmation - no OTP, no 3D Secure
   */
  TR_PAYED_WITHOUT_CONFIRMATION,

  /**
   * Incorrect confirmation type
   */
  TR_INCORRECT_CONFIRMATION,

  /**
   * Adding card was processed without confirmation - no OTP, no 3D Secure
   */
  TR_ADDED_WITHOUT_CONFIRMATION,

  CLICK,
  CLOSE

}
