import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { t } from '@lingui/core/macro';
import { useMemo } from 'react';
import { isDefined } from 'twenty-shared/utils';
import { IconEraser, IconVariablePlus } from 'twenty-ui/display';

import { useObjectMetadataItem } from '@/object-metadata/hooks/useObjectMetadataItem';
import { CoreObjectNameSingular } from '@/object-metadata/types/CoreObjectNameSingular';
import { AdvancedFilterCommandMenuValueFormInput } from '@/object-record/advanced-filter/command-menu/components/AdvancedFilterCommandMenuValueFormInput';
import { useUpsertRecordFilter } from '@/object-record/record-filter/hooks/useUpsertRecordFilter';
import { currentRecordFiltersComponentState } from '@/object-record/record-filter/states/currentRecordFiltersComponentState';
import { RLSMeValueSelect } from '@/settings/roles/role-permissions/object-level-permissions/record-level-permissions/components/RLSMeValueSelect';
import { Dropdown } from '@/ui/layout/dropdown/components/Dropdown';
import { useRecoilComponentValue } from '@/ui/utilities/state/component-state/hooks/useRecoilComponentValue';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  flex: 1;
`;

const StyledValueContainer = styled.div`
  flex: 1;
`;

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

const StyledReadOnlyInput = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  padding: ${({ theme }) => theme.spacing(2)};
  border: 1px solid ${({ theme }) => theme.border.color.medium};
  border-top-left-radius: ${({ theme }) => theme.border.radius.sm};
  border-bottom-left-radius: ${({ theme }) => theme.border.radius.sm};
  background-color: ${({ theme }) => theme.background.secondary};
  color: ${({ theme }) => theme.font.color.primary};
  font-size: ${({ theme }) => theme.font.size.md};
  height: 32px;
  box-sizing: border-box;
`;

type RLSValueInputProps = {
  recordFilterId: string;
};

export const RLSValueInput = ({ recordFilterId }: RLSValueInputProps) => {
  const theme = useTheme();

  const currentRecordFilters = useRecoilComponentValue(
    currentRecordFiltersComponentState,
  );

  const recordFilter = currentRecordFilters.find(
    (filter) => filter.id === recordFilterId,
  );

  const { objectMetadataItem: workspaceMemberMetadataItem } =
    useObjectMetadataItem({
      objectNameSingular: CoreObjectNameSingular.WorkspaceMember,
    });

  const { upsertRecordFilter } = useUpsertRecordFilter();

  const dynamicValue = recordFilter?.rlsDynamicValue;
  const isDynamicMode = isDefined(dynamicValue);

  // Get the workspace member field label for display
  const workspaceMemberFieldLabel = useMemo(() => {
    if (!dynamicValue) {
      return null;
    }

    // Look up the field name from workspace member metadata
    const workspaceMemberField = workspaceMemberMetadataItem?.fields.find(
      (field) => field.id === dynamicValue.workspaceMemberFieldMetadataId,
    );

    if (isDefined(workspaceMemberField)) {
      // If it's the id field, just show "Me" (no label needed)
      if (workspaceMemberField.name === 'id') {
        return null;
      }
      return workspaceMemberField.label;
    }

    // Fallback to subFieldName or field ID if field not found
    return (
      dynamicValue.workspaceMemberSubFieldName ??
      dynamicValue.workspaceMemberFieldMetadataId
    );
  }, [dynamicValue, workspaceMemberMetadataItem?.fields]);

  const handleSelectDynamicValue = (
    workspaceMemberFieldMetadataId: string,
    workspaceMemberSubFieldName?: string | null,
  ) => {
    if (!recordFilter) {
      return;
    }

    upsertRecordFilter({
      ...recordFilter,
      value: '',
      rlsDynamicValue: {
        workspaceMemberFieldMetadataId,
        workspaceMemberSubFieldName: workspaceMemberSubFieldName ?? null,
      },
    });
  };

  const handleResetToStaticValue = () => {
    if (!recordFilter) {
      return;
    }

    upsertRecordFilter({
      ...recordFilter,
      rlsDynamicValue: null,
    });
  };

  if (isDynamicMode) {
    const displayLabel = isDefined(workspaceMemberFieldLabel)
      ? t`Me` + ` / ${workspaceMemberFieldLabel}`
      : t`Me`;

    return (
      <StyledContainer>
        <StyledReadOnlyInput>{displayLabel}</StyledReadOnlyInput>
        <StyledIconContainer
          onClick={handleResetToStaticValue}
          aria-label={t`Reset to static value`}
        >
          <IconEraser size={theme.icon.size.sm} />
        </StyledIconContainer>
      </StyledContainer>
    );
  }

  return (
    <StyledContainer>
      <StyledValueContainer>
        <AdvancedFilterCommandMenuValueFormInput
          recordFilterId={recordFilterId}
        />
      </StyledValueContainer>
      <Dropdown
        dropdownId={`workspace-member-field-select-${recordFilterId}`}
        clickableComponent={
          <StyledIconContainer aria-label={t`Use dynamic value from current user`}>
            <IconVariablePlus size={theme.icon.size.sm} />
          </StyledIconContainer>
        }
        dropdownComponents={
          <RLSMeValueSelect
            onSelect={handleSelectDynamicValue}
            recordFilterId={recordFilterId}
          />
        }
        dropdownPlacement="bottom-end"
      />
    </StyledContainer>
  );
};
