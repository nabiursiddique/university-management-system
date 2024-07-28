import { Form, Select } from 'antd';
import { Controller } from 'react-hook-form';

type TUMSelectProps = {
  label: string;
  name: string;
  options: { value: string; label: string; disabled?: boolean }[] | undefined;
  disabled?: boolean;
};

const UMSelect = ({ label, name, options, disabled }: TUMSelectProps) => {
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Form.Item label={label}>
          <Select
            style={{ width: '100%' }}
            {...field}
            options={options}
            size='large'
            disabled={disabled}
          />
          {error && <small style={{ color: 'red' }}>{error.message}</small>}
        </Form.Item>
      )}
    />
  );
};

export default UMSelect;
