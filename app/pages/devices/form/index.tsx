import { ChangeEvent, FormEvent, useState } from 'react';
import { servicesProvider } from '../../../common/services-provider';
import Button from '../../../components/button';
import InputText from '../../../components/input-text';
import Message from '../../../components/message';
import Select from '../../../components/select';
import { Device } from '../../../model/device';
import { deviceTypeMapper, deviceTypes, noDeviceType } from '../common/common-values';
import styles from './device-form.module.css';

const devicesApiService = servicesProvider.getDevicesApiService();

type FormData = Device;

const deviceTypesOptions = [noDeviceType, ...deviceTypes];

type Props = {
  device: Device;
  onCancel(): void;
};

const DeviceForm = ({ device, onCancel }: Props): JSX.Element => {
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [formData, setFormData] = useState<FormData>({ ...device });


  const updatingDevice = !!formData.id;
  const actionTitle = updatingDevice ? 'Update' : 'Add';

  const mapDeviceType = (type: string) => {
    return (
      <option key={type} value={type}>{deviceTypeMapper[type] || type}</option>
    );
  }

  const onTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, type: e.target.value });
  };

  const onSystemNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, system_name: e.target.value });
  };

  const onHDDCapacityChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, hdd_capacity: e.target.value });
  };

  const validateFormData = (): string => {
    if (!formData.system_name ||
      !formData.hdd_capacity ||
      !formData.type ||
      formData.type === noDeviceType ||
      !/^([0-9]+\.?[0-9]*|\.[0-9]+)$/.test(formData.hdd_capacity)) {
      return 'Invalid form. Make sure you entered all the required values and they are correct.';
    }
    return '';
  };

  const submitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    const formValidationMessage = validateFormData();
    if (formValidationMessage) {
      setErrorMessage(formValidationMessage);
      return;
    }
    setSubmitting(true);
    try {
      if (updatingDevice) {
        await devicesApiService.updateDevice(formData);
        setSuccessMessage('Device updated!');
      } else {
        await devicesApiService.createDevice(formData);
        setFormData({ ...device });
        setSuccessMessage('The device has been added!');
      }
    } catch (error) {
      console.error('Error persisting device!', error);
      setErrorMessage(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.mainContainer}>
      <div>
        <h3 className={styles.title}>{actionTitle} Device</h3>
        <form onSubmit={submitForm} noValidate className={styles.form}>
          <div className={styles.formFieldSection}>
            <label htmlFor="systemName" className={styles.label}>System Name *</label>
            <InputText id="systemName" className={styles.formField} value={formData.system_name} onChange={onSystemNameChange} />
          </div>
          <div className={styles.formFieldSection}>
            <label htmlFor="systemName" className={styles.label}>Type *</label>
            <Select id="type" className={styles.formField} value={formData.type} onChange={onTypeChange}>
              {deviceTypesOptions.map(mapDeviceType)}
            </Select>
          </div>
          <div className={styles.formFieldSection}>
            <label htmlFor="systemName" className={styles.label}>HDD Capacity (GB) *</label>
            <InputText id="hddCapacity" className={styles.formField} value={formData.hdd_capacity} onChange={onHDDCapacityChange} />
          </div>
          <div>
            <div className={styles.messagesSection}>
              {errorMessage && <Message id="deviceFormSuccessMsg" type="error">{errorMessage}</Message>}
              {successMessage && <Message id="deviceFormErrorMsg">{successMessage}</Message>}
            </div>
            <div className={styles.buttonsSection}>
              <Button id="submitBtn"
                type="submit"
                disabled={submitting}
                title="Save"
                className={styles.saveButton}>SAVE</Button>
              <Button id="cancelBtn"
                onClick={onCancel}
                disabled={submitting}
                className={styles.cancelButton}
                title="Cancel">CANCEL</Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
};

export default DeviceForm;
