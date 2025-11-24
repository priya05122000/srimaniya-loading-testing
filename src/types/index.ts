// Admins
export interface Admin {
    id: string;
    name: string;
    profile_pic: string;
    phone_number: string;
    email: string;
    address: string;
    password_hash: string;
    role: string;
    status: boolean;
    created_by: string | null;
    updated_by: string | null;
    deleted_by: string | null;
    created_at: string | null;
    updated_at: string | null;
    deleted_at: string | null;
}

// Admin Password Reset
export interface AdminPasswordReset {
    id: string;
    admin_id: string;
    token: string;
    expires_at: string;
    used: boolean;
    created_at: string | null;
}

export interface StaffProfile {
    id: string;
    name: string;
    designation: string | null;
    experience_years: string | null;
    education: string | null;
    profile_photo_url: string | null;
    description: string | null;
    status: boolean;
    display_order: number;
    created_by: string | null;
    updated_by: string | null;
    created_at: string | null;
    updated_at: string | null;
    deleted_at: string | null;
}


// Banner
export interface Banner {
    id: string;
    title: string;
    sub_title: string;
    image_desktop: string;
    image_tab: string;
    image_phone: string;
    button_text: string | null;
    button_link: string | null;
    is_active: boolean;
    display_order: number;
    created_by: string | null;
    updated_by: string | null;
    deleted_by: string | null;
    is_deleted: boolean;
    created_at: string | null;
    updated_at: string | null;
    deleted_at: string | null;
}



// Blog Post
export interface BlogPost {
    id: string;
    title: string;
    slug: string;
    image_url: string;
    sub_title: string;
    description: string;
    category_id: string;
    is_published: boolean;
    active: boolean;
    created_by: string | null;
    updated_by: string | null;
    deleted_by: string | null;
    published_at: string | null;
    created_at: string | null;
    updated_at: string | null;
    deleted_at: string | null;
}

// Category
export interface Category {
    id: string;
    name: string;
    slug: string;
    description: string;
    created_by: string | null;
    updated_by: string | null;
    deleted_by: string | null;
    deleted_at: string | null;
    created_at: string | null;
    updated_at: string | null;
}

// Appointment Request
export interface AppointmentRequest {
    id: string;
    name: string;
    course_id: string | null;
    email: string | null;
    phone_number: string;
    message: string | null;
    is_handled: boolean;
    handled_by: string | null;
    created_by: string | null;
    updated_by: string | null;
    deleted_by: string | null;
    created_at: string | null;
    updated_at: string | null;
    deleted_at: string | null;
}


export interface SiteInfo {
    id: string;
    staff_count: number | null;
    student_count: number | null;
    placement_count: number | null;
    phone_primary: string | null;
    phone_secondary: string | null;
    fax: string | null;
    email_primary: string | null;
    email_secondary: string | null;
    address: string | null;
    vision: string | null;
    mission: string | null;
    values: string | null;
    homepage_image_url: string | null;
    contact_image_url: string | null;
    created_by: string | null;
    updated_by: string | null;
    created_at: string | null;
    updated_at: string | null;
}


export interface Testimonial {
    id: string;
    name: string;
    designation: string | null;
    photo_url: string | null;
    rating: number | null;
    message: string;
    status: boolean;
    created_by: string | null;
    updated_by: string | null;
    deleted_by: string | null;
    created_at: string | null;
    updated_at: string | null;
    deleted_at: string | null;
}

export interface Course {
    id: string;
    title: string;
    subtitle: string | null;
    eligibility: string | null;
    description: string | null;
    opportunities: string | null;
    duration: string | null;
    created_by: string | null;
    updated_by: string | null;
    deleted_by: string | null;
    created_at: string | null;
    updated_at: string | null;
    deleted_at: string | null;
}

export interface AlumniStory {
    id: string;
    name: string;
    batch_year: number | null;
    course: string | null;
    designation: string | null;
    country: string | null;
    company: string | null;
    photo_url: string | null;
    story: string;
    video_url: string | null;
    status: boolean;
    display_order: number | null;
    created_by: string | null;
    updated_by: string | null;
    deleted_by: string | null;
    created_at: string | null;
    updated_at: string | null;
    deleted_at: string | null;
}

export interface Country {
    id: string;
    name: string;
    placement_count: number | null;
    max_ctc: number | null;
    flag_img: string |null;
    status: boolean;
    created_by: string | null;
    updated_by: string | null;
    deleted_by: string | null;
    created_at: string | null;
    updated_at: string | null;
    deleted_at: string | null;
}

export interface Award {
    id: string;
    name: string;
    subtitle: string | null;
    description: string | null;
    award_year: number;
    recipient_name: string | null;
    status: boolean;
    created_by: string | null;
    updated_by: string | null;
    deleted_by: string | null;
    created_at: string | null;
    updated_at: string | null;
    deleted_at: string | null;
}

export interface Job {
  id: string;
  title: string;
  subtitle: string;
  experience_years: number | null;
  openings: string | null;
  description: string | null;
  is_active: boolean;
  created_by: string | null;
  updated_by: string | null;
  deleted_by: string | null;
  created_at: string | null;
  updated_at: string | null;
  deleted_at: string | null;
}

export interface JobApplication {
  id: string;
  full_name: string;
  email: string;
  phone_number: string;
  resume_url: string | null;
  job_id: string | null;
  is_handled: boolean;
  handled_by: string | null;
  created_by: string | null;
  updated_by: string | null;
  deleted_by: string | null;
  created_at: string | null;
  updated_at: string | null;
  deleted_at: string | null;
}
