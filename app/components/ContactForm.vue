<template>
  <v-container fluid class="py-12">
    <v-row justify="center">
      <v-col cols="12" md="8" lg="6">
        <v-card class="pa-8" elevation="8" rounded="xl">
          <v-card-title
            class="text-h4 text-center mb-6 text-primary d-flex justify-center align-center"
          >
            <v-icon icon="mdi-email-outline" class="me-3" size="large" />
            Get In Touch
          </v-card-title>

          <v-card-subtitle
            class="text-center mb-8 text-medium-emphasis text-body-1"
          >
            We'd love to hear from you. Send us a message and we'll respond as
            soon as possible.
          </v-card-subtitle>

          <v-form
            ref="formRef"
            v-model="isFormValid"
            @submit.prevent="submitForm"
          >
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="form.name"
                  label="Full Name"
                  prepend-inner-icon="mdi-account-outline"
                  variant="outlined"
                  :rules="[rules.required]"
                  counter="50"
                  maxlength="50"
                  class="mb-2"
                  required
                  clearable
                />
              </v-col>

              <v-col cols="12">
                <v-text-field
                  v-model="form.email"
                  label="Email Address"
                  type="email"
                  prepend-inner-icon="mdi-email-outline"
                  variant="outlined"
                  :rules="[rules.required, rules.email]"
                  class="mb-2"
                  required
                  clearable
                />
              </v-col>

              <v-col cols="12">
                <v-text-field
                  v-model="form.subject"
                  label="Subject"
                  prepend-inner-icon="mdi-format-title"
                  variant="outlined"
                  :rules="[rules.required]"
                  counter="100"
                  maxlength="100"
                  class="mb-2"
                  required
                  clearable
                />
              </v-col>

              <v-col cols="12">
                <v-textarea
                  v-model="form.message"
                  label="Your Message"
                  prepend-inner-icon="mdi-message-text-outline"
                  variant="outlined"
                  :rules="[rules.required, rules.minLength]"
                  counter="500"
                  maxlength="500"
                  rows="4"
                  auto-grow
                  class="mb-4"
                  required
                  clearable
                />
              </v-col>
            </v-row>

            <v-row class="mt-4">
              <v-col cols="12">
                <v-btn
                  type="submit"
                  color="primary"
                  size="large"
                  block
                  :loading="isSubmitting"
                  :disabled="!isFormValid || isSubmitting"
                  class="text-none font-weight-medium"
                  prepend-icon="mdi-send"
                  variant="elevated"
                >
                  {{ isSubmitting ? "Sending..." : "Send Message" }}
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-card>
      </v-col>
    </v-row>

    <!-- Success/Error Snackbar -->
    <v-snackbar
      v-model="showSnackbar"
      :color="snackbarColor"
      :timeout="5000"
      location="top"
      variant="elevated"
    >
      <div class="d-flex align-center">
        <v-icon :icon="snackbarIcon" class="me-2" />
        {{ snackbarMessage }}
      </div>

      <template #actions>
        <v-btn variant="text" icon="mdi-close" @click="showSnackbar = false" />
      </template>
    </v-snackbar>
  </v-container>
</template>

<script setup lang="ts">
// Form reference for validation
const formRef = ref();
const isFormValid = ref(false);

// Form data
const form = ref({
  name: "",
  email: "",
  subject: "",
  message: "",
});

// Loading state
const isSubmitting = ref(false);

// Snackbar state
const showSnackbar = ref(false);
const snackbarMessage = ref("");
const snackbarColor = ref("success");
const snackbarIcon = ref("mdi-check-circle");

// Validation rules
const rules = {
  required: (v: string) => !!v || "This field is required",
  email: (v: string) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(v) || "Please enter a valid email address";
  },
  minLength: (v: string) =>
    v.length >= 10 || "Message must be at least 10 characters long",
};

// Form submission handler
const submitForm = async () => {
  // Validate form first
  const { valid } = await formRef.value.validate();

  if (!valid) {
    showNotification(
      "Please fix the errors in the form",
      "error",
      "mdi-alert-circle",
    );
    return;
  }

  isSubmitting.value = true;

  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Handle form submission logic here
    console.log("Form submitted:", form.value);

    // Show success message
    showNotification(
      "Message sent successfully! We'll get back to you soon.",
      "success",
      "mdi-check-circle",
    );

    // Reset form
    resetForm();
  } catch (error) {
    console.error("Form submission error:", error);
    showNotification(
      "Failed to send message. Please try again.",
      "error",
      "mdi-alert-circle",
    );
  } finally {
    isSubmitting.value = false;
  }
};

// Helper function to show notifications
const showNotification = (message: string, color: string, icon: string) => {
  snackbarMessage.value = message;
  snackbarColor.value = color;
  snackbarIcon.value = icon;
  showSnackbar.value = true;
};

// Reset form function
const resetForm = () => {
  form.value = {
    name: "",
    email: "",
    subject: "",
    message: "",
  };
  formRef.value.resetValidation();
};
</script>
