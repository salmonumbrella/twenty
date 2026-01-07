import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { type VariablePickerComponent } from '@/object-record/record-field/ui/form-types/types/VariablePickerComponent';
import { IconEraser } from 'twenty-ui/display';

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

export const RLSEraserButton: VariablePickerComponent & {
  (props: { instanceId: string; onReset: () => void }): JSX.Element;
} = ({ onReset }) => {
  const theme = useTheme();

  return (
    <StyledIconContainer onClick={onReset}>
      <IconEraser size={theme.icon.size.sm} />
    </StyledIconContainer>
  );
};

