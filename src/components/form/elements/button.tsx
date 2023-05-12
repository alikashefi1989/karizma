// module
import styled from "@emotion/styled";

interface ButtonProps {
    title: string;
    disable: boolean;
    style?: WrapperProps['style'];
    onClick: () => void;
}

const Button = ({ title, disable, style, onClick }: ButtonProps): JSX.Element => {
    return <Wrapper style={style}>
        <FormButton
            disable={disable}
            onClick={onClick}
        >
            {title}
        </FormButton>
    </Wrapper>;
};

export default Button;

interface WrapperProps {
    style?: { [key: string]: string | number };
}

const Wrapper = styled.div<WrapperProps>(({ style }) => ({
    boxSizing: 'border-box',
    width: '100%',
    height: 'max-content',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: '10px',
    marginBottom: '10px',
    ...style,
}));

const FormButton = styled.div<any>(({ theme, disable }) => ({
    boxSizing: 'border-box',
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100px',
    height: '40px',
    borderRadius: '5px',
    cursor: disable ? 'not-allowed' : 'pointer',
    backgroundColor: 'green',
    color: theme.palette.color,
}))