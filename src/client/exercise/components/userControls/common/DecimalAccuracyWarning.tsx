import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons/faExclamationTriangle'

interface Props {
  fractionDigits: number
}

export function DecimalAccuracyWarning({ fractionDigits }: Props): JSX.Element {
  return (
    <small className="form-text text-warning">
      <FontAwesomeIcon icon={faExclamationTriangle} /> Kérlek, {fractionDigits} tizedesjegy
      pontossággal add meg a megoldást.
    </small>
  )
}
