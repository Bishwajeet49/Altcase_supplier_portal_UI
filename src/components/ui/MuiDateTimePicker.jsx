import React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import dayjs from 'dayjs';

const MuiDateTimePicker = ({ 
  value, 
  setValue, 
  setTouched, 
  meta, 
  minDate, 
  maxDate, 
  disabled = false,
  label,
  placeholder,
  required = false,
  fullWidth = true,
  size = 'medium',
  variant = 'outlined',
  helperText,
  error,
  ...props 
}) => {
  // Create custom theme with green primary color
  const customTheme = createTheme({
    palette: {
      primary: {
        main: '#21B546',
        light: '#4ade80',
        dark: '#16a34a',
        contrastText: '#ffffff',
      },
    },
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            display: 'flex !important', // Fix the inline-flex issue
            width: '100% !important',
          },
        },
      },
      MuiPickersDay: {
        styleOverrides: {
          root: {
            '&.Mui-selected': {
              backgroundColor: '#21B546 !important',
              color: '#ffffff',
              '&:hover': {
                backgroundColor: '#16a34a !important',
              },
            },
            '&:hover': {
              backgroundColor: '#dcfce7',
            },
          },
        },
      },
      MuiClockNumber: {
        styleOverrides: {
          root: {
            '&.Mui-selected': {
              backgroundColor: '#21B546 !important',
              color: '#ffffff',
            },
          },
        },
      },
      MuiClock: {
        styleOverrides: {
          pin: {
            backgroundColor: '#21B546',
          },
          pointer: {
            backgroundColor: '#21B546',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            color: '#21B546',
            '&:hover': {
              backgroundColor: '#dcfce7',
            },
          },
        },
      },
    },
  });

  const handleDateTimeChange = (newValue) => {
    // Convert dayjs to JavaScript Date object for Formik
    setValue(newValue ? newValue.toDate() : null);
  };

  const handleBlur = () => {
    setTouched(true);
  };

  // Convert value to dayjs object for MUI
  const dayjsValue = value ? dayjs(value) : null;
  const minDateTime = minDate ? dayjs(minDate) : null;
  const maxDateTime = maxDate ? dayjs(maxDate) : null;

  return (
    <div className="mb-4">
      <ThemeProvider theme={customTheme}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            value={dayjsValue}
            onChange={handleDateTimeChange}
            onBlur={handleBlur}
            minDateTime={minDateTime}
            maxDateTime={maxDateTime}
            disabled={disabled}
            label={label}
            placeholder={placeholder}
            required={required}
            fullWidth={fullWidth}
            size={size}
            variant={variant}
            helperText={helperText}
            error={error || (meta?.touched && meta?.error)}
            slotProps={{
              textField: {
                style: {
                  backgroundColor: disabled ? '#f3f4f6 !important' : '#ffffff !important',
                  border: `1px solid ${meta?.touched && meta?.error ? '#ef4444' : '#e5e7eb'} !important`, // border-dark-200 or error
                  borderRadius: '8px !important',
                  '& .MuiOutlinedInput-root': {
                    border: `1px solid ${meta?.touched && meta?.error ? '#ef4444' : '#d1d5db'} !important`,
                  },
                  '& .MuiOutlinedInput-root.Mui-focused': {
                    border: '1px solid #21B546 !important',
                    boxShadow: '0 0 0 1px #21B546 !important',
                  },
                  '& .MuiInputLabel-root': {
                    color: '#374151 !important',
                    '&.Mui-focused': {
                      color: '#9ca3af !important',
                    },
                  },
                  '& .MuiInputBase-input': {
                    color: '#6b7280 !important',
                    '&::placeholder': {
                      color: '#9ca3af !important',
                      opacity: 1,
                    },
                  },
                  '& .MuiInputBase-root:hover': {
                    backgroundColor: '#f3f4f6 !important',
                    color: '#21B546 !important',
                  },
                  '& .MuiInputBase-root.Mui-focused': {
                    backgroundColor: '#f3f4f6 !important',
                    color: '#21B546 !important',
                  },
                },
              },
              popper: {
                style: {
                  '& .MuiPaper-root': {
                    border: '1px solid #e5e7eb',
                    backgroundColor: '#ffffff',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                  },
                  '& .MuiPickersDay-root': {
                    color: '#21B546',
                    '&.Mui-selected': {
                      backgroundColor: '#21B546 !important',
                      color: '#ffffff !important',
                      '&:hover': {
                        backgroundColor: '#16a34a !important',
                      },
                    },
                    '&:hover': {
                      backgroundColor: '#dcfce7',
                    },
                  },
                  '& .MuiClockNumber-root': {
                    color: '#374151',
                    '&.Mui-selected': {
                      backgroundColor: '#21B546 !important',
                      color: '#ffffff !important',
                    },
                  },
                  '& .MuiClock-pin': {
                    backgroundColor: '#21B546 !important',
                  },
                  '& .MuiClock-pointer': {
                    backgroundColor: '#21B546 !important',
                    borderColor: '#21B546 !important',
                  },
                  '& .MuiButton-root': {
                    color: '#21B546 !important',
                    '&:hover': {
                      backgroundColor: '#dcfce7',
                    },
                  },
                },
              },
            }}
            {...props}
          />
        </LocalizationProvider>
      </ThemeProvider>
    </div>
  );
};

export default MuiDateTimePicker; 