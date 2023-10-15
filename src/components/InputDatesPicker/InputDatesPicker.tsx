import DatePicker, { registerLocale } from 'react-datepicker';
import fr from 'date-fns/locale/fr';

import './InputDatesPicker.scss';

interface InputDatesPickerProps {
  startDate: Date | null;
  endDate: Date | null;
  onStartDateChange: (date: Date) => void;
  onEndDateChange: (date: Date) => void;
}

function InputDatesPicker({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
}: InputDatesPickerProps) {
  registerLocale('fr', fr);

  return (
    <>
      {/* Start Date Input */}
      <div className="field">
        <label className="field-label" htmlFor="date_start">
          Date de début
        </label>
        <i className="field-icon fa-solid fa-calendar" />
        <DatePicker
          id="date_start"
          className="field-input"
          selected={startDate}
          onChange={onStartDateChange}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          placeholderText="Date de début (jj/mm/aaaa)"
          dateFormat="dd/MM/yyyy"
          locale="fr" // Set french locale
          required
        />
      </div>
      {/* End Date Input */}

      <div className="field">
        <label className="field-label" htmlFor="date_end">
          Date de fin
        </label>
        <i className="field-icon fa-solid fa-calendar" />
        <DatePicker
          id="date_end"
          className="field-input"
          selected={endDate}
          onChange={onEndDateChange}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          placeholderText="Date de fin (jj/mm/aaaa)"
          dateFormat="dd/MM/yyyy"
          locale="fr" // Set french locale
          required
        />
      </div>
    </>
  );
}

export default InputDatesPicker;
