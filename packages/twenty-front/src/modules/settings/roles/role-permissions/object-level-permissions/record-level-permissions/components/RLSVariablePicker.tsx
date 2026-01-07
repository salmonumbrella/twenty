import { type VariablePickerComponent } from '@/object-record/record-field/ui/form-types/types/VariablePickerComponent';
import { RLSMeValueSelect } from '@/settings/roles/role-permissions/object-level-permissions/record-level-permissions/components/RLSMeValueSelect';
import { Dropdown } from '@/ui/layout/dropdown/components/Dropdown';
import { css, useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { IconVariablePlus } from 'twenty-ui/display';

const StyledRLSPickerContainer = styled.div<{
  multiline?: boolean;
  readonly?: boolean;
}>`
  align-items: center;
  display: flex;
  justify-content: center;

  ${({ theme, readonly }) =>
    !readonly &&
    css`
      :hover {
        background-color: ${theme.background.transparent.light};
      }
    `}

  ${({ theme, multiline }) =>
    multiline
      ? css`
          border-radius: ${theme.border.radius.sm};
          padding: ${theme.spacing(0.5)} ${theme.spacing(0)};
          position: absolute;
          right: ${theme.spacing(0)};
          top: ${theme.spacing(0)};
        `
      : css`
          background-color: ${theme.background.transparent.lighter};
          border-top-right-radius: ${theme.border.radius.sm};
          border-bottom-right-radius: ${theme.border.radius.sm};
          border: 1px solid ${theme.border.color.medium};
          cursor: pointer;
          padding: ${theme.spacing(2)};
          color: ${theme.font.color.tertiary};
        `}
`;

type RLSVariablePickerProps = Parameters<VariablePickerComponent>[0] & {
  recordFilterId: string;
  onMeSelect: (
    workspaceMemberFieldMetadataId: string,
    workspaceMemberSubFieldName?: string | null,
  ) => void;
};

export const createRLSVariablePicker = (
  recordFilterId: string,
  onMeSelect: (
    workspaceMemberFieldMetadataId: string,
    workspaceMemberSubFieldName?: string | null,
  ) => void,
): VariablePickerComponent => {
  const RLSVariablePicker: VariablePickerComponent = ({
    instanceId,
    disabled,
    multiline,
  }) => {
    const theme = useTheme();

    return (
      <StyledRLSPickerContainer multiline={multiline} readonly={disabled}>
        <Dropdown
          dropdownId={`rls-me-picker-${instanceId}-${recordFilterId}`}
          clickableComponent={
            <div>
              <IconVariablePlus size={theme.icon.size.sm} />
            </div>
          }
          dropdownComponents={
            <RLSMeValueSelect
              onSelect={onMeSelect}
              recordFilterId={recordFilterId}
            />
          }
          dropdownPlacement="bottom-end"
        />
      </StyledRLSPickerContainer>
    );
  };

  return RLSVariablePicker;
};

