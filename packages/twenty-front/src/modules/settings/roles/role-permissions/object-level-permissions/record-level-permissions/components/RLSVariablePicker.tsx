import { type VariablePickerComponent } from '@/object-record/record-field/ui/form-types/types/VariablePickerComponent';
import { RLSMeValueSelect } from '@/settings/roles/role-permissions/object-level-permissions/record-level-permissions/components/RLSMeValueSelect';
import { Dropdown } from '@/ui/layout/dropdown/components/Dropdown';
import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { IconVariablePlus } from 'twenty-ui/display';

const StyledIconContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  background-color: ${({ theme }) => theme.background.transparent.lighter};
  border-top-right-radius: ${({ theme }) => theme.border.radius.sm};
  border-bottom-right-radius: ${({ theme }) => theme.border.radius.sm};
  border: 1px solid ${({ theme }) => theme.border.color.medium};
  border-left: none;
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing(2)};
  color: ${({ theme }) => theme.font.color.tertiary};

  &:hover {
    background-color: ${({ theme }) => theme.background.transparent.light};
  }
`;

export const RLSVariablePicker: VariablePickerComponent & {
  (props: {
    instanceId: string;
    recordFilterId: string;
    onMeSelect: (
      workspaceMemberFieldMetadataId: string,
      workspaceMemberSubFieldName?: string | null,
    ) => void;
  }): JSX.Element;
} = ({ instanceId, recordFilterId, onMeSelect }) => {
  const theme = useTheme();

  return (
    <Dropdown
      dropdownId={`rls-me-picker-${instanceId}-${recordFilterId}`}
      clickableComponent={
        <StyledIconContainer>
          <IconVariablePlus size={theme.icon.size.sm} />
        </StyledIconContainer>
      }
      dropdownComponents={
        <RLSMeValueSelect
          onSelect={onMeSelect}
          recordFilterId={recordFilterId}
        />
      }
      dropdownPlacement="bottom-end"
    />
  );
};

