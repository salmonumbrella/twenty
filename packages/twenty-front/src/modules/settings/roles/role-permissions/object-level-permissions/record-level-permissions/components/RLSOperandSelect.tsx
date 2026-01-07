import styled from '@emotion/styled';

import { AdvancedFilterCommandMenuRecordFilterOperandSelect } from '@/object-record/advanced-filter/command-menu/components/AdvancedFilterCommandMenuRecordFilterOperandSelect';

const StyledContainer = styled.div`
  width: 100px;
`;

type RLSOperandSelectProps = {
  recordFilterId: string;
};

export const RLSOperandSelect = ({
  recordFilterId,
}: RLSOperandSelectProps) => {
  return (
    <StyledContainer>
      <AdvancedFilterCommandMenuRecordFilterOperandSelect
        recordFilterId={recordFilterId}
      />
    </StyledContainer>
  );
};

