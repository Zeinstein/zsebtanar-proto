import React from 'react'
import { useModel, UseModelProps } from '../../../../generic/hooks/model'
import { UCSingleNumber } from 'shared/exercise/types'
import { Checkbox, Input, TextEditor, NumberInput } from '../../../../generic/components/form'
import { FormGroup } from '../../../../generic/components'
import { MarkdownWithScript } from '../../../../script/components'
import { UserControlNameInput } from '../common/UserControlNameInput'

export function SingleNumberAdmin(bindProps: UseModelProps<UCSingleNumber>) {
  const { bind, data } = useModel<UCSingleNumber>(bindProps)

  return (
    <div className="user-control uc-simple-number uc-simple-number-admin">
      <UserControlNameInput {...bind('name')} />
      <div>
        <Checkbox {...bind('isDynamic')}>Dinamikus</Checkbox>
      </div>

      <hr />

      <FormGroup label="Előtag">
        {id => <TextEditor {...bind('props.prefix')} id={id} preview={MarkdownWithScript} />}
      </FormGroup>
      <FormGroup label="Utótag">
        {id => <TextEditor {...bind('props.postfix')} id={id} preview={MarkdownWithScript} />}
      </FormGroup>

      <hr />

      <FormGroup label="Pontosság">
        {id => (
          <>
            <Input
              type="number"
              {...bind('props.fractionDigits')}
              id={id}
              step={1}
              min={0}
              max={10}
              required
              aria-describedby="max-fraction-digits-desc"
              className="form-control form-control-sm"
            />
            <small id="max-fraction-digits-desc" className="text-muted">
              Maximális tizedes jegyek száma
            </small>
          </>
        )}
      </FormGroup>

      <FormGroup label="Megoldás">
        {id =>
          data.isDynamic ? (
            <div className="form-control-plaintext">
              Definiáld a megoldás függvényt:
              <code>(def solution-{data.name} #(...))</code>
            </div>
          ) : (
            <NumberInput
              {...bind('solution')}
              id={id}
              step={1 / Math.pow(10, data.props?.fractionDigits ?? 0)}
              min={0}
              required
              className="form-control form-control-sm"
            />
          )
        }
      </FormGroup>
    </div>
  )
}
