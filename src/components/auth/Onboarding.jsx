import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  validateMobile, 
  validateOTP, 
  validateUsername, 
  validateEmail, 
  validateMPIN, 
  validateConfirmMPIN 
} from '../../utils/validation';
import authService from '../../services/authService';
import toast from 'react-hot-toast';
import MobileEntry from './onboarding/MobileEntry';
import OtpVerification from './onboarding/OtpVerification';
import ProfileCompletion from './onboarding/ProfileCompletion';
import EmailVerification from './onboarding/EmailVerification';
import OnboardingHeader from './onboarding/OnboardingHeader';

const STEPS = {
  MOBILE_ENTRY: 'mobile_entry',
  OTP_VERIFICATION: 'otp_verification', 
  PROFILE_COMPLETION: 'profile_completion',
  EMAIL_VERIFICATION: 'email_verification'
};

export default function Onboarding() {
  const navigate = useNavigate();
  
  // Current step state
  const [currentStep, setCurrentStep] = useState(STEPS.MOBILE_ENTRY);
  const [isLoading, setIsLoading] = useState(false);
  
  // Registration data
  const [registrationData, setRegistrationData] = useState({
    mobile: '',
    userUuid: '',
    otpCode: '',
    username: '',
    email: '',
    mpin: '',
    confirmMpin: ''
  });
  
  // Step 1: Mobile Entry
  const [mobileValidation, setMobileValidation] = useState({ isValid: false, error: '' });
  
  // Step 2: OTP Verification
  const [otpValidation, setOtpValidation] = useState({ isValid: false, error: '' });
  
  // Step 3: Profile Completion
  const [profileValidations, setProfileValidations] = useState({
    username: { isValid: false, error: '' },
    email: { isValid: false, error: '' },
    mpin: { isValid: false, error: '' },
    confirmMpin: { isValid: false, error: '' }
  });
  
  // Step 4: Email Verification
  const [emailOtpValidation, setEmailOtpValidation] = useState({ isValid: false, error: '' });

  // Handle mobile input change
  const handleMobileChange = (value) => {
    setRegistrationData(prev => ({ ...prev, mobile: value }));
    const validation = validateMobile(value);
    setMobileValidation(validation);
  };

  // Handle OTP input change
  const handleOtpChange = (value) => {
    setRegistrationData(prev => ({ ...prev, otpCode: value }));
    const validation = validateOTP(value);
    setOtpValidation(validation);
  };

  // Handle profile input changes
  const handleProfileChange = (field, value) => {
    setRegistrationData(prev => ({ ...prev, [field]: value }));
    
    let validation;
    switch (field) {
      case 'username':
        validation = validateUsername(value);
        break;
      case 'email':
        validation = validateEmail(value);
        break;
      case 'mpin':
        validation = validateMPIN(value);
        // Also validate confirm MPIN if it exists
        if (registrationData.confirmMpin) {
          const confirmMpinValidation = validateConfirmMPIN(value, registrationData.confirmMpin);
          setProfileValidations(prev => ({ ...prev, confirmMpin: confirmMpinValidation }));
        }
        break;
      case 'confirmMpin':
        validation = validateConfirmMPIN(registrationData.mpin, value);
        break;
      default:
        validation = { isValid: true, error: '' };
    }
    
    setProfileValidations(prev => ({ ...prev, [field]: validation }));
  };

  // Handle email OTP input change
  const handleEmailOtpChange = (value) => {
    setRegistrationData(prev => ({ ...prev, otpCode: value }));
    const validation = validateOTP(value);
    setEmailOtpValidation(validation);
  };

  // Step 1: Start Registration
  const handleStartRegistration = async (e) => {
    e.preventDefault();
    
    if (!mobileValidation.isValid) {
      toast.error('Please enter a valid mobile number');
      return;
    }
    
    setIsLoading(true);
    
    try {
      const response = await authService.startRegistration(registrationData.mobile);
      console.log(response,'response');
      if (response.success) {
        const data = response.data;
        setRegistrationData(prev => ({ 
          ...prev, 
          userUuid: data.user_uuid,
          otpCode: '' // Reset OTP for fresh entry
        }));
        
        // Check registration status and navigate accordingly
        if (data.is_mobile_verified) {
          if (data.is_profile_completed && data.is_mpin_set && data.is_email_verified) {
            // All steps completed, do silent login
            await handleSilentLogin();
          } else if (!data.is_profile_completed || !data.is_mpin_set) {
            // Skip to profile completion
            setCurrentStep(STEPS.PROFILE_COMPLETION);
          } else if (!data.is_email_verified) {
            // Skip to email verification
            setCurrentStep(STEPS.EMAIL_VERIFICATION);
          }
        } else {
          // Mobile not verified, proceed to OTP verification
          setCurrentStep(STEPS.OTP_VERIFICATION);
        }
        
        toast.success('OTP sent to your mobile number');
      } else {
        toast.error(response.message || 'Failed to start registration');
      }
    } catch (error) {
      console.error('Start registration error:', error);
      toast.error(error.message || 'Failed to start registration');
    //   toast.error(error.message || 'Failed to start registration');
    } finally {
      setIsLoading(false);
    }
  };

  // Step 2: Verify OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    
    if (!otpValidation.isValid) {
      toast.error('Please enter a valid OTP');
      return;
    }
    
    setIsLoading(true);
    
    try {
      const response = await authService.verifyMobileAndGetUser(registrationData.mobile, registrationData.otpCode);
      
      if (response.success) {
        const data = response.data;
        setRegistrationData(prev => ({ ...prev, userUuid: data.user_uuid }));
        
        if (data.is_profile_completed && data.is_mpin_set && data.is_email_verified) {
          // All steps completed, do silent login
          await handleSilentLogin();
        } else {
          // Proceed to profile completion
          setCurrentStep(STEPS.PROFILE_COMPLETION);
        }
        
        toast.success('Mobile number verified successfully');
      } else {
        toast.error(response.message || 'Invalid OTP');
      }
    } catch (error) {
      console.error('OTP verification error:', error);
      toast.error(error.message || 'Invalid or expired OTP');
    } finally {
      setIsLoading(false);
    }
  };

  // Step 3: Complete Profile
  const handleCompleteProfile = async (e) => {
    e.preventDefault();
    
    setIsLoading(true);
    
    try {
      const profileData = {
        user_uuid: registrationData.userUuid,
        username: registrationData.username,
        mpin: registrationData.mpin,
        confirm_mpin: registrationData.confirmMpin,
        email: registrationData.email
      };
      
      const response = await authService.completeProfile(profileData);
      
      if (response.success) {
        setCurrentStep(STEPS.EMAIL_VERIFICATION);
        setRegistrationData(prev => ({ ...prev, otpCode: '' })); // Reset OTP for email verification
        toast.success('Profile completed successfully. Please verify your email.');
      } else {
        toast.error(response.message || 'Failed to complete profile');
      }
    } catch (error) {
      console.error('Profile completion error:', error);
      toast.error(error.message || 'Failed to complete profile');
    } finally {
      setIsLoading(false);
    }
  };

  // Step 4: Verify Email
  const handleVerifyEmail = async (e) => {
    e.preventDefault();
    
    if (!emailOtpValidation.isValid) {
      toast.error('Please enter a valid OTP');
      return;
    }
    
    setIsLoading(true);
    
    try {
      const response = await authService.verifyEmailAndComplete(registrationData.userUuid, registrationData.otpCode);
      
      if (response.success) {
        // Email verified, now do silent login
        await handleSilentLogin();
      } else {
        toast.error(response.message || 'Invalid OTP');
      }
    } catch (error) {
      console.error('Email verification error:', error);
      toast.error(error.message || 'Invalid or expired OTP');
    } finally {
      setIsLoading(false);
    }
  };

  // Silent login after successful onboarding
  const handleSilentLogin = async () => {
    try {
      const response = await authService.silentLogin(registrationData.mobile, registrationData.mpin);
      
      if (response.success) {
        toast.success('Registration completed successfully!');
        navigate('/dashboard');
      } else {
        toast.error('Registration completed but login failed. Please sign in manually.');
        navigate('/auth/sign-in');
      }
    } catch (error) {
      console.error('Silent login error:', error);
      toast.error('Registration completed but login failed. Please sign in manually.');
      navigate('/auth/sign-in');
    }
  };

  // Get step information
  const getStepInfo = () => {
    switch (currentStep) {
      case STEPS.MOBILE_ENTRY:
        return { title: 'Enter Mobile Number', subtitle: 'We\'ll send you an OTP to verify your number' };
      case STEPS.OTP_VERIFICATION:
        return { title: 'Verify OTP', subtitle: `Enter the 6-digit code sent to ${registrationData.mobile}` };
      case STEPS.PROFILE_COMPLETION:
        return { title: 'Complete Your Profile', subtitle: 'Set up your account with basic information' };
      case STEPS.EMAIL_VERIFICATION:
        return { title: 'Verify Email', subtitle: `Enter the 6-digit code sent to ${registrationData.email}` };
      default:
        return { title: 'Getting Started', subtitle: 'Welcome to Fitizen' };
    }
  };

  // Render current step component
  const renderCurrentStep = () => {
    switch (currentStep) {
      case STEPS.MOBILE_ENTRY:
        return (
          <MobileEntry
            mobile={registrationData.mobile}
            onMobileChange={handleMobileChange}
            validation={mobileValidation}
            onSubmit={handleStartRegistration}
            isLoading={isLoading}
          />
        );
      
      case STEPS.OTP_VERIFICATION:
        return (
          <OtpVerification
            otp={registrationData.otpCode}
            onOtpChange={handleOtpChange}
            validation={otpValidation}
            onSubmit={handleVerifyOtp}
            isLoading={isLoading}
            mobile={registrationData.mobile}
          />
        );
      
      case STEPS.PROFILE_COMPLETION:
        return (
          <ProfileCompletion
            formData={{
              username: registrationData.username,
              email: registrationData.email,
              mpin: registrationData.mpin,
              confirmMpin: registrationData.confirmMpin
            }}
            onFormChange={handleProfileChange}
            validations={profileValidations}
            onSubmit={handleCompleteProfile}
            isLoading={isLoading}
          />
        );
      
      case STEPS.EMAIL_VERIFICATION:
        return (
          <EmailVerification
            otp={registrationData.otpCode}
            onOtpChange={handleEmailOtpChange}
            validation={emailOtpValidation}
            onSubmit={handleVerifyEmail}
            isLoading={isLoading}
            email={registrationData.email}
          />
        );
      
      default:
        return null;
    }
  };

  const stepInfo = getStepInfo();

  return (
    <div className="flex items-center justify-center px-4 sm:px-6  lg:px-8 pt-4 sm:pt-6 md:pt-10 lg:pt-20 pb-4 min-h-full  w-full ">


      <div className="max-w-[500px] w-full space-y-8">
        <OnboardingHeader title={stepInfo.title} subtitle={stepInfo.subtitle} />
        
        <div className="bg-white rounded-xl shadow-lg p-8">
          {renderCurrentStep()}
          
          {/* Back to Sign In Link */}
          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => navigate('/auth/sign-in')}
              className="text-primary hover:text-primary font-medium text-sm"
            >
              Already have an account? Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 