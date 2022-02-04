/**
 * Available states for StateService
 */
export enum StatesEnum {
  /**
   * Error state if something is totally wrong.
   */
  ST_ERROR,

  /**
   * Screen with bindings list
   */
  ST_BINDINGS_LIST,

  /**
   * Error message if there is an error getting bindings
   */
  ST_GET_BINDINGS_ERROR,

  /**
   * Screen for creating new binding
   */
  ST_ADD_NEW_CARD,

  /**
   * Error message screen after create binding failure
   */
  ST_ADD_NEW_CARD_ERROR,

  /**
   * Error message screen after init payment failure
   */
  ST_PAYMENT_ERROR,

  /**
   * 3D secure screen
   */
  ST_3D_SECURE,

  /**
   * Enter SMS code screen
   */
  ST_ENTER_SMS,

  /**
   * 3D secure error message screen
   */
  ST_3D_SECURE_ERROR,

  /**
   * SMS code error message screen
   */
  ST_SMS_ERROR,

  /**
   * Payment OK screen
   */
  ST_PAYMENT_OK,

  OPEN,
  CLOSE
}
