import Error from '@/components/atoms/Error';
import Form from '@/components/atoms/Form';
import FormInput from '@/components/atoms/FormInput';
import FormLabel from '@/components/atoms/FormLabel';
import Strong from '@/components/atoms/Strong';
import LoginButton from '@/components/molecules/LoginButton';
import Relative from '@/components/molecules/Relative';

const FindForm = ({ els, handleFindSubmit }) => {
  return (
    <Form onSubmit={handleFindSubmit}>
      {els.map((el, key) => {
        return (
          <div key={key}>
            <FormLabel htmlFor={el.props.id}>
              (<Strong>*</Strong>) {el.name}
            </FormLabel>
            <Relative>
              <FormInput {...el.props} onChange={el.handleChange} />
              {el.props.value && <Relative.Cancel {...el.props} onClick={el.handleClick} />}
              {el.props.error && <Error>{el.props.error}</Error>}
            </Relative>
          </div>
        );
      })}
      <div>
        <LoginButton>찾기</LoginButton>
      </div>
    </Form>
  );
};

export default FindForm;
