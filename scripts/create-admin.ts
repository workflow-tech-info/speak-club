import { createClient } from '@insforge/sdk';

const baseUrl = 'https://99w3488i.us-east.insforge.app';
const anonKey = 'ik_f8af05f06297081f765cf918396eec0d';

const insforge = createClient({ baseUrl, anonKey });

async function createAdmin() {
  console.log('Creating admin user...');
  const { data, error } = await insforge.auth.signUp({
    email: 'admin@speak-club.io',
    password: 'Speakclub360@',
    name: 'Admin User',
  });

  if (error) {
    console.error('Error:', error.message);
  } else {
    console.log('Success:', data);
  }
}

createAdmin();
