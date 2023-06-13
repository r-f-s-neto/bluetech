import React from 'react';
import FormText from '../../../components/FormText';
import FormSelect from '../../../components/FormSelect';
import ButtonCheckout from '../../../components/ButtonCheckout';
import { useNavigate } from 'react-router-dom';

const estados = [
  'AC',
  'AL',
  'AP',
  'AM',
  'BA',
  'CE',
  'ES',
  'GO',
  'MA',
  'MT',
  'MS',
  'MG',
  'PA',
  'PB',
  'PR',
  'PE',
  'PI',
  'RJ',
  'RN',
  'RS',
  'RO',
  'RR',
  'SC',
  'SP',
  'SE',
  'TO',
  'DF',
];
const Endereco = () => {
  const [endereco, setEndereco] = React.useState('');
  const [cep, setcep] = React.useState('');
  const [nome, setNome] = React.useState('');
  const [cpf, setCpf] = React.useState('');
  const [cidade, setCidade] = React.useState('');
  const [selectedState, setSelectedState] = React.useState('');
  const navigate = useNavigate();

  function handleClick(event) {
    event.preventDefault();
    navigate('/checkout/frete');
  }

  return (
    <form>
      <FormText
        value={nome}
        setValue={setNome}
        htmlFor="nome"
        label="Nome Completo"
        type="text"
        required
      />
      <FormText
        value={cpf}
        setValue={setCpf}
        htmlFor="cpf"
        label="CPF"
        type="number"
        required
      />
      <FormText
        value={endereco}
        setValue={setEndereco}
        htmlFor="endereco"
        label="Endereço"
        type="text"
        required
      />
      <FormText
        value={cep}
        setValue={setcep}
        htmlFor="cep"
        label="CEP"
        type="number"
        required
      />
      <FormText
        value={cidade}
        setValue={setCidade}
        htmlFor="cidade"
        label="Cidade"
        type="text"
        required
      />
      <FormSelect
        options={estados}
        label="Estado"
        htmlFor="estado"
        value={selectedState}
        setValue={setSelectedState}
        required
      />
      <ButtonCheckout text="Próximo" handleClick={handleClick} />
    </form>
  );
};

export default Endereco;
