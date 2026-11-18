<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '../lib/supabase'

export interface Employee {
  id: string
  employeeCode: string
  lastName: string
  firstName: string
  middleName: string
  dateOfBirth: string
  gender: string
  civilStatus: string
  nationality: string
  address: string
  email: string
  phone: string
  emergencyContact: string
  position: string
  designation: string
  department: string
  employmentStatus: 'Regular' | 'Probationary' | 'Contractual' | 'Part-Time'
  dateHired: string
  salary: number
  bankAccount: string
  highestEducation: string
  school: string
  yearGraduated: string
  skills: string
  workExperience: string
  tinNumber: string
  sssNumber: string
  philhealthNumber: string
  pagibigNumber: string
  bioRemarks: string
}

export interface SalaryRecord {
  id: string
  employeeId: string
  previousSalary: number
  newSalary: number
  effectiveDate: string
  reason: string
  approvedBy: string
}

export interface ScannedFile {
  id: string
  employeeId: string
  fileName: string
  documentType: string
  fileSize: number
  storagePath: string
  uploadedAt: string
  publicUrl?: string
}

const router = useRouter()

const employees = ref<Employee[]>([])
const salaryHistory = ref<SalaryRecord[]>([])
const scannedFiles = ref<ScannedFile[]>([])
const fileCounts = ref<Record<string, number>>({})

const isLoading = ref(false)
const loadingSalary = ref(false)
const loadingFiles = ref(false)
const uploadingFile = ref(false)

const searchQuery = ref('')
const departmentFilter = ref('All')
const statusFilter = ref('All')

// Modals
const isFormModalOpen = ref(false)
const isBioModalOpen = ref(false)
const isDossierModalOpen = ref(false)
const activeDossierTab = ref<'salary' | 'files'>('salary')

const editingId = ref<string | null>(null)
const previousSalaryBeforeEdit = ref<number>(0)
const selectedEmployee = ref<Employee | null>(null)

// Salary Form
const newSalaryForm = ref({
  newSalary: 0,
  effectiveDate: new Date().toISOString().slice(0, 10),
  reason: 'Annual Performance Review',
  approvedBy: 'HR Admin',
})

// Scanned File Form
const selectedDocCategory = ref('Valid Government ID')
const fileInputRef = ref<HTMLInputElement | null>(null)

const defaultForm = (): Omit<Employee, 'id'> => ({
  employeeCode: '',
  lastName: '',
  firstName: '',
  middleName: '',
  dateOfBirth: '',
  gender: 'Female',
  civilStatus: 'Single',
  nationality: 'Filipino',
  address: '',
  email: '',
  phone: '',
  emergencyContact: '',
  position: '',
  designation: '',
  department: 'Nursing & Care',
  employmentStatus: 'Regular',
  dateHired: new Date().toISOString().slice(0, 10),
  salary: 28000,
  bankAccount: '',
  highestEducation: 'Bachelor of Science in Nursing',
  school: '',
  yearGraduated: '',
  skills: '',
  workExperience: '',
  tinNumber: '',
  sssNumber: '',
  philhealthNumber: '',
  pagibigNumber: '',
  bioRemarks: '',
})

const form = ref<Omit<Employee, 'id'>>(defaultForm())

// ========================================
// SUPABASE DATA FETCHING
// ========================================

async function fetchEmployees() {
  isLoading.value = true
  const { data, error } = await supabase
    .from('employees')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching employees:', error.message)
  } else if (data) {
    employees.value = data.map((row: any) => ({
      id: row.id,
      employeeCode: row.employee_code,
      lastName: row.last_name,
      firstName: row.first_name,
      middleName: row.middle_name || '',
      dateOfBirth: row.date_of_birth || '',
      gender: row.gender || 'Female',
      civilStatus: row.civil_status || 'Single',
      nationality: row.nationality || 'Filipino',
      address: row.address,
      email: row.email,
      phone: row.phone || '',
      emergencyContact: row.emergency_contact || '',
      position: row.position,
      designation: row.designation,
      department: row.department || '',
      employmentStatus: row.employment_status || 'Regular',
      dateHired: row.date_hired,
      salary: Number(row.salary) || 0,
      bankAccount: row.bank_account || '',
      highestEducation: row.highest_education || '',
      school: row.school || '',
      yearGraduated: row.year_graduated || '',
      skills: row.skills || '',
      workExperience: row.work_experience || '',
      tinNumber: row.tin_number || '',
      sssNumber: row.sss_number || '',
      philhealthNumber: row.philhealth_number || '',
      pagibigNumber: row.pagibig_number || '',
      bioRemarks: row.bio_remarks || '',
    }))
    await fetchFileCounts()
  }
  isLoading.value = false
}

async function fetchFileCounts() {
  const { data } = await supabase.from('employee_files').select('employee_id')
  if (data) {
    const counts: Record<string, number> = {}
    data.forEach((f: any) => {
      counts[f.employee_id] = (counts[f.employee_id] || 0) + 1
    })
    fileCounts.value = counts
  }
}

onMounted(() => {
  fetchEmployees()
})

async function logoutAdmin() {
  await supabase.auth.signOut()
  sessionStorage.removeItem('homemedix_admin_auth')
  router.push('/admin/login')
}

// ========================================
// COMPUTED FILTERS & METRICS
// ========================================

const departments = computed(() => {
  const set = new Set(employees.value.map((e) => e.department).filter(Boolean))
  return ['All', ...Array.from(set)]
})

const filteredEmployees = computed(() => {
  return employees.value.filter((emp) => {
    const q = searchQuery.value.trim().toLowerCase()
    const fullName = `${emp.firstName} ${emp.middleName} ${emp.lastName}`.toLowerCase()
    const matchesSearch =
      !q ||
      fullName.includes(q) ||
      emp.employeeCode.toLowerCase().includes(q) ||
      emp.email.toLowerCase().includes(q) ||
      emp.position.toLowerCase().includes(q) ||
      emp.designation.toLowerCase().includes(q)

    const matchesDept =
      departmentFilter.value === 'All' || emp.department === departmentFilter.value
    const matchesStatus =
      statusFilter.value === 'All' || emp.employmentStatus === statusFilter.value

    return matchesSearch && matchesDept && matchesStatus
  })
})

const totalEmployees = computed(() => employees.value.length)
const regularCount = computed(
  () => employees.value.filter((e) => e.employmentStatus === 'Regular').length
)
const totalMonthlyPayroll = computed(() =>
  employees.value.reduce((sum, emp) => sum + (Number(emp.salary) || 0), 0)
)

function generateNextCode(): string {
  const nextNum = employees.value.length + 1
  return `HMX-${String(nextNum).padStart(3, '0')}`
}

// ========================================
// EMPLOYEE CRUD OPERATIONS
// ========================================

function openCreateModal() {
  editingId.value = null
  previousSalaryBeforeEdit.value = 0
  const fresh = defaultForm()
  fresh.employeeCode = generateNextCode()
  form.value = fresh
  isFormModalOpen.value = true
}

function openEditModal(emp: Employee) {
  editingId.value = emp.id
  previousSalaryBeforeEdit.value = Number(emp.salary) || 0
  const { id, ...rest } = emp
  form.value = { ...rest }
  isFormModalOpen.value = true
}

async function saveEmployee() {
  if (!form.value.lastName.trim() || !form.value.firstName.trim()) return

  const cleanSalary = Number(form.value.salary) || 0
  const payload = {
    employee_code: form.value.employeeCode || generateNextCode(),
    last_name: form.value.lastName,
    first_name: form.value.firstName,
    middle_name: form.value.middleName,
    date_of_birth: form.value.dateOfBirth,
    gender: form.value.gender,
    civil_status: form.value.civilStatus,
    nationality: form.value.nationality,
    address: form.value.address,
    email: form.value.email,
    phone: form.value.phone,
    emergency_contact: form.value.emergencyContact,
    position: form.value.position,
    designation: form.value.designation,
    department: form.value.department,
    employment_status: form.value.employmentStatus,
    date_hired: form.value.dateHired,
    salary: cleanSalary,
    bank_account: form.value.bankAccount,
    highest_education: form.value.highestEducation,
    school: form.value.school,
    year_graduated: form.value.yearGraduated,
    skills: form.value.skills,
    work_experience: form.value.workExperience,
    tin_number: form.value.tinNumber,
    sss_number: form.value.sssNumber,
    philhealth_number: form.value.philhealthNumber,
    pagibig_number: form.value.pagibigNumber,
    bio_remarks: form.value.bioRemarks,
  }

  if (editingId.value) {
    const { error } = await supabase
      .from('employees')
      .update(payload)
      .eq('id', editingId.value)

    if (!error) {
      if (cleanSalary !== previousSalaryBeforeEdit.value) {
        await supabase.from('salary_history').insert({
          employee_id: editingId.value,
          previous_salary: previousSalaryBeforeEdit.value,
          new_salary: cleanSalary,
          effective_date: new Date().toISOString().slice(0, 10),
          reason: 'Updated via Employee Profile Edit',
          approved_by: 'HR Admin',
        })
      }
    }
  } else {
    const { data: inserted, error } = await supabase
      .from('employees')
      .insert(payload)
      .select()
      .single()

    if (!error && inserted) {
      await supabase.from('salary_history').insert({
        employee_id: inserted.id,
        previous_salary: 0,
        new_salary: cleanSalary,
        effective_date: payload.date_hired,
        reason: 'Initial Hiring Compensation',
        approved_by: 'HR Admin',
      })
    }
  }

  isFormModalOpen.value = false
  await fetchEmployees()
}

async function deleteEmployee(emp: Employee) {
  const confirmed = window.confirm(
    `Remove ${emp.firstName} ${emp.lastName} (${emp.employeeCode}) and all Supabase records?`
  )
  if (!confirmed) return

  const { error } = await supabase.from('employees').delete().eq('id', emp.id)
  if (!error) {
    await fetchEmployees()
  }
}

function openBioModal(emp: Employee) {
  selectedEmployee.value = emp
  isBioModalOpen.value = true
}

function printBioSheet() {
  window.print()
}

// ========================================
// SALARY HISTORY & SCANNED FILES DOSSIER
// ========================================

async function openDossierModal(emp: Employee, tab: 'salary' | 'files') {
  selectedEmployee.value = emp
  activeDossierTab.value = tab
  newSalaryForm.value = {
    newSalary: emp.salary,
    effectiveDate: new Date().toISOString().slice(0, 10),
    reason: 'Annual Performance Review',
    approvedBy: 'HR Admin',
  }
  isDossierModalOpen.value = true

  await Promise.all([fetchSalaryHistory(emp.id), fetchScannedFiles(emp.id)])
}

async function fetchSalaryHistory(employeeId: string) {
  loadingSalary.value = true
  const { data } = await supabase
    .from('salary_history')
    .select('*')
    .eq('employee_id', employeeId)
    .order('effective_date', { ascending: false })

  if (data) {
    salaryHistory.value = data.map((s: any) => ({
      id: s.id,
      employeeId: s.employee_id,
      previousSalary: Number(s.previous_salary) || 0,
      newSalary: Number(s.new_salary) || 0,
      effectiveDate: s.effective_date,
      reason: s.reason,
      approvedBy: s.approved_by,
    }))
  }
  loadingSalary.value = false
}

async function addSalaryAdjustment() {
  if (!selectedEmployee.value) return
  const emp = selectedEmployee.value
  const updatedAmount = Number(newSalaryForm.value.newSalary) || 0

  // 1. Insert into salary_history
  await supabase.from('salary_history').insert({
    employee_id: emp.id,
    previous_salary: emp.salary,
    new_salary: updatedAmount,
    effective_date: newSalaryForm.value.effectiveDate,
    reason: newSalaryForm.value.reason,
    approved_by: newSalaryForm.value.approvedBy || 'HR Admin',
  })

  // 2. Update employee base salary
  await supabase
    .from('employees')
    .update({ salary: updatedAmount })
    .eq('id', emp.id)

  emp.salary = updatedAmount
  await Promise.all([fetchSalaryHistory(emp.id), fetchEmployees()])
}

async function fetchScannedFiles(employeeId: string) {
  loadingFiles.value = true
  const { data } = await supabase
    .from('employee_files')
    .select('*')
    .eq('employee_id', employeeId)
    .order('created_at', { ascending: false })

  if (data) {
    const loadedFiles: ScannedFile[] = []
    for (const f of data) {
      // Generate signed URL for private bucket (valid for 60 seconds)
      const { data: signed } = await supabase.storage
        .from('employee-files')
        .createSignedUrl(f.storage_path, 60)

      loadedFiles.push({
        id: f.id,
        employeeId: f.employee_id,
        fileName: f.file_name,
        documentType: f.document_type,
        fileSize: f.file_size,
        storagePath: f.storage_path,
        uploadedAt: f.uploaded_at,
        publicUrl: signed?.signedUrl,
      })
    }
    scannedFiles.value = loadedFiles
  }
  loadingFiles.value = false
}

async function handleFileUpload(event: Event) {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (!file || !selectedEmployee.value) return

  if (file.size > 10 * 1024 * 1024) {
    alert('File size must be under 10 MB.')
    return
  }

  uploadingFile.value = true
  const empId = selectedEmployee.value.id
  const safePath = `${empId}/${Date.now()}_${file.name}`

  try {
    // 1. Upload to Supabase Storage bucket 'employee-files'
    const { error: uploadErr } = await supabase.storage
      .from('employee-files')
      .upload(safePath, file)

    if (uploadErr) throw uploadErr

    // 2. Insert metadata into employee_files table
    await supabase.from('employee_files').insert({
      employee_id: empId,
      file_name: file.name,
      document_type: selectedDocCategory.value,
      file_size: file.size,
      storage_path: safePath,
      uploaded_at: new Date().toISOString().slice(0, 10),
    })

    await fetchScannedFiles(empId)
    await fetchFileCounts()
  } catch (err: any) {
    console.error('Upload failed:', err.message)
    alert('Failed to upload file to Supabase Storage.')
  } finally {
    uploadingFile.value = false
    if (fileInputRef.value) fileInputRef.value.value = ''
  }
}

async function deleteScannedFile(fileItem: ScannedFile) {
  if (!selectedEmployee.value) return
  const ok = window.confirm(`Delete "${fileItem.fileName}" permanently?`)
  if (!ok) return

  // 1. Remove from Storage bucket
  await supabase.storage.from('employee-files').remove([fileItem.storagePath])

  // 2. Remove from database table
  await supabase.from('employee_files').delete().eq('id', fileItem.id)

  await fetchScannedFiles(selectedEmployee.value.id)
  await fetchFileCounts()
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    maximumFractionDigits: 2,
  }).format(amount || 0)
}

function exportCSV() {
  const headers = [
    'Employee ID',
    'Last Name',
    'First Name',
    'Middle Name',
    'Address',
    'Email',
    'Phone',
    'Position',
    'Designation',
    'Department',
    'Status',
    'Date Hired',
    'Monthly Salary',
    'TIN',
    'SSS',
    'PhilHealth',
    'Pag-IBIG',
  ]

  const rows = filteredEmployees.value.map((e) => [
    e.employeeCode,
    e.lastName,
    e.firstName,
    e.middleName,
    `"${(e.address || '').replace(/"/g, '""')}"`,
    e.email,
    e.phone,
    `"${(e.position || '').replace(/"/g, '""')}"`,
    `"${(e.designation || '').replace(/"/g, '""')}"`,
    e.department,
    e.employmentStatus,
    e.dateHired,
    e.salary,
    e.tinNumber,
    e.sssNumber,
    e.philhealthNumber,
    e.pagibigNumber,
  ])

  const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n')
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', `homemedix-employees-${new Date().toISOString().slice(0, 10)}.csv`)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
</script>

<template>
  <section class="ems-section">
    <div class="container">
      <!-- HEADER -->
      <div class="ems-header">
        <div>
          <span class="ems-eyebrow">ADMIN PORTAL · SUPABASE CLOUD HR DATABASE</span>
          <h1 class="ems-title">Employee Management System</h1>
          <p class="ems-subtitle">
            Manage employee profiles, salary progression history, printable bio-data, and scanned 201 personnel files.
          </p>
        </div>

        <div class="ems-header-actions">
          <button
            type="button"
            class="btn btn-outline"
            @click="exportCSV"
          >
            Export CSV
          </button>

          <button
            type="button"
            class="btn btn-primary"
            @click="openCreateModal"
          >
            + Add Employee
          </button>

          <button
            type="button"
            class="btn btn-outline"
            @click="logoutAdmin"
          >
            Logout
          </button>
        </div>
      </div>

      <!-- KPI CARDS -->
      <div class="kpi-grid">
        <div class="kpi-card">
          <span class="kpi-label">Total Staff Records</span>
          <strong class="kpi-value">{{ totalEmployees }}</strong>
          <span class="kpi-meta">Synced in Supabase PostgreSQL</span>
        </div>

        <div class="kpi-card">
          <span class="kpi-label">Regular Employees</span>
          <strong class="kpi-value">{{ regularCount }}</strong>
          <span class="kpi-meta">Permanent clinical &amp; admin staff</span>
        </div>

        <div class="kpi-card">
          <span class="kpi-label">Monthly Payroll Total</span>
          <strong class="kpi-value">{{ formatCurrency(totalMonthlyPayroll) }}</strong>
          <span class="kpi-meta">Current active base salaries</span>
        </div>
      </div>

      <!-- SEARCH & FILTERS -->
      <div class="toolbar-card">
        <div class="search-box">
          <input
            v-model="searchQuery"
            type="text"
            class="form-input"
            placeholder="Search by name, ID, email, position, or designation..."
          >
        </div>

        <div class="filter-group">
          <select
            v-model="departmentFilter"
            class="form-select"
          >
            <option
              v-for="dept in departments"
              :key="dept"
              :value="dept"
            >
              {{ dept === 'All' ? 'All Departments' : dept }}
            </option>
          </select>

          <select
            v-model="statusFilter"
            class="form-select"
          >
            <option value="All">All Statuses</option>
            <option value="Regular">Regular</option>
            <option value="Probationary">Probationary</option>
            <option value="Contractual">Contractual</option>
            <option value="Part-Time">Part-Time</option>
          </select>
        </div>
      </div>

      <!-- TABLE -->
      <div class="table-card">
        <div class="table-responsive">
          <table class="ems-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Employee Full Name &amp; Contact</th>
                <th>Position &amp; Designation</th>
                <th>Date Hired</th>
                <th>Current Salary</th>
                <th>Status</th>
                <th class="text-right">201 Records &amp; Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="isLoading">
                <td
                  colspan="7"
                  class="empty-state"
                >
                  Loading employee records from Supabase...
                </td>
              </tr>

              <tr v-else-if="filteredEmployees.length === 0">
                <td
                  colspan="7"
                  class="empty-state"
                >
                  No employee records found. Click <strong>+ Add Employee</strong> to create the first record.
                </td>
              </tr>

              <tr
                v-for="emp in filteredEmployees"
                :key="emp.id"
              >
                <td>
                  <span class="emp-badge">{{ emp.employeeCode }}</span>
                </td>

                <td>
                  <div class="emp-name">
                    {{ emp.lastName }}, {{ emp.firstName }} {{ emp.middleName }}
                  </div>
                  <div class="emp-sub">{{ emp.email }}</div>
                  <div class="emp-address">{{ emp.address }}</div>
                </td>

                <td>
                  <div class="emp-position">{{ emp.position }}</div>
                  <div class="emp-sub">{{ emp.designation }} · {{ emp.department }}</div>
                </td>

                <td class="whitespace-nowrap">
                  {{ emp.dateHired }}
                </td>

                <td class="emp-salary whitespace-nowrap">
                  {{ formatCurrency(emp.salary) }}
                </td>

                <td>
                  <span
                    class="status-pill"
                    :class="`status-${emp.employmentStatus.toLowerCase()}`"
                  >
                    {{ emp.employmentStatus }}
                  </span>
                </td>

                <td class="actions-cell">
                  <button
                    type="button"
                    class="action-btn action-bio"
                    @click="openDossierModal(emp, 'salary')"
                  >
                    Salary History
                  </button>
                  <button
                    type="button"
                    class="action-btn action-bio"
                    @click="openDossierModal(emp, 'files')"
                  >
                    201 Files ({{ fileCounts[emp.id] || 0 }})
                  </button>
                  <button
                    type="button"
                    class="action-btn action-bio"
                    @click="openBioModal(emp)"
                  >
                    Bio-Data
                  </button>
                  <button
                    type="button"
                    class="action-btn action-edit"
                    @click="openEditModal(emp)"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    class="action-btn action-delete"
                    @click="deleteEmployee(emp)"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- ========================================
         SALARY HISTORY & SCANNED 201 FILES MODAL
    ======================================== -->
    <div
      v-if="isDossierModalOpen && selectedEmployee"
      class="modal-backdrop"
      @click.self="isDossierModalOpen = false"
    >
      <div class="modal-panel modal-lg">
        <div class="modal-header">
          <div>
            <span class="ems-eyebrow">{{ selectedEmployee.employeeCode }} · EMPLOYEE 201 DOSSIER</span>
            <h2>
              {{ selectedEmployee.lastName }}, {{ selectedEmployee.firstName }}
              {{ selectedEmployee.middleName }}
            </h2>
          </div>
          <button
            type="button"
            class="close-btn"
            @click="isDossierModalOpen = false"
          >
            &times;
          </button>
        </div>

        <!-- TAB SWITCHER -->
        <div class="dossier-tabs">
          <button
            type="button"
            class="tab-btn"
            :class="{ active: activeDossierTab === 'salary' }"
            @click="activeDossierTab = 'salary'"
          >
            Salary Progression History
          </button>
          <button
            type="button"
            class="tab-btn"
            :class="{ active: activeDossierTab === 'files' }"
            @click="activeDossierTab = 'files'"
          >
            Scanned Documents &amp; 201 Files
          </button>
        </div>

        <div class="modal-body">
          <!-- TAB 1: SALARY HISTORY -->
          <div v-if="activeDossierTab === 'salary'">
            <form
              class="sub-card"
              @submit.prevent="addSalaryAdjustment"
            >
              <h3 class="form-section-title">Record New Salary Adjustment</h3>
              <div class="form-grid-4">
                <div class="form-field">
                  <label>New Monthly Salary (PHP)</label>
                  <input
                    v-model.number="newSalaryForm.newSalary"
                    type="number"
                    min="0"
                    step="100"
                    class="form-input"
                    required
                  >
                </div>

                <div class="form-field">
                  <label>Effective Date</label>
                  <input
                    v-model="newSalaryForm.effectiveDate"
                    type="date"
                    class="form-input"
                    required
                  >
                </div>

                <div class="form-field">
                  <label>Reason / Adjustment Type</label>
                  <select
                    v-model="newSalaryForm.reason"
                    class="form-select"
                  >
                    <option value="Annual Performance Review">Annual Performance Review</option>
                    <option value="Regularization Increase">Regularization Increase</option>
                    <option value="Promotion / New Designation">Promotion / New Designation</option>
                    <option value="Cost of Living Adjustment">Cost of Living Adjustment</option>
                    <option value="Salary Correction">Salary Correction</option>
                  </select>
                </div>

                <div class="form-field flex-end">
                  <button
                    type="submit"
                    class="btn btn-primary w-full"
                  >
                    Update Salary
                  </button>
                </div>
              </div>
            </form>

            <h3 class="form-section-title mt-20">Compensation Timeline</h3>
            <div
              v-if="loadingSalary"
              class="empty-state"
            >
              Loading salary history...
            </div>
            <div
              v-else-if="salaryHistory.length === 0"
              class="empty-state"
            >
              No salary history recorded yet.
            </div>
            <table
              v-else
              class="ems-table"
            >
              <thead>
                <tr>
                  <th>Effective Date</th>
                  <th>Previous Salary</th>
                  <th>New Salary</th>
                  <th>Adjustment</th>
                  <th>Reason</th>
                  <th>Approved By</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="item in salaryHistory"
                  :key="item.id"
                >
                  <td>{{ item.effectiveDate }}</td>
                  <td>{{ formatCurrency(item.previousSalary) }}</td>
                  <td class="emp-salary">{{ formatCurrency(item.newSalary) }}</td>
                  <td>
                    <span
                      class="status-pill"
                      :class="
                        item.newSalary >= item.previousSalary
                          ? 'status-regular'
                          : 'status-probationary'
                      "
                    >
                      {{ item.newSalary >= item.previousSalary ? '+' : ''
                      }}{{ formatCurrency(item.newSalary - item.previousSalary) }}
                    </span>
                  </td>
                  <td>{{ item.reason }}</td>
                  <td class="emp-sub">{{ item.approvedBy }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- TAB 2: SCANNED FILES -->
          <div v-if="activeDossierTab === 'files'">
            <div class="sub-card">
              <h3 class="form-section-title">Upload Scanned Employee Document (PDF, JPG, PNG — Max 10MB)</h3>
              <div class="form-grid-3">
                <div class="form-field">
                  <label>Document Category</label>
                  <select
                    v-model="selectedDocCategory"
                    class="form-select"
                  >
                    <option value="Signed Bio-Data / Resume">Signed Bio-Data / Resume</option>
                    <option value="PRC License / TESDA Certificate">PRC License / TESDA Certificate</option>
                    <option value="Employment Contract">Employment Contract</option>
                    <option value="Valid Government ID">Valid Government ID</option>
                    <option value="NBI / Police Clearance">NBI / Police Clearance</option>
                    <option value="Medical / Fit-to-Work Certificate">Medical / Fit-to-Work Certificate</option>
                    <option value="SSS / PhilHealth / Pag-IBIG / TIN">SSS / PhilHealth / Pag-IBIG / TIN</option>
                    <option value="Other 201 Document">Other 201 Document</option>
                  </select>
                </div>

                <div class="form-field span-2">
                  <label>Select Scanned File</label>
                  <input
                    ref="fileInputRef"
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png,.webp"
                    class="form-input"
                    :disabled="uploadingFile"
                    @change="handleFileUpload"
                  >
                </div>
              </div>
              <p
                v-if="uploadingFile"
                class="upload-status"
              >
                Uploading file to Supabase Storage...
              </p>
            </div>

            <h3 class="form-section-title mt-20">Stored Scanned Documents</h3>
            <div
              v-if="loadingFiles"
              class="empty-state"
            >
              Loading scanned files...
            </div>
            <div
              v-else-if="scannedFiles.length === 0"
              class="empty-state"
            >
              No scanned documents uploaded for this employee yet.
            </div>
            <table
              v-else
              class="ems-table"
            >
              <thead>
                <tr>
                  <th>Document Category</th>
                  <th>File Name</th>
                  <th>Size</th>
                  <th>Uploaded Date</th>
                  <th class="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="fileItem in scannedFiles"
                  :key="fileItem.id"
                >
                  <td>
                    <span class="emp-badge">{{ fileItem.documentType }}</span>
                  </td>
                  <td class="emp-name">{{ fileItem.fileName }}</td>
                  <td class="emp-sub">{{ formatFileSize(fileItem.fileSize) }}</td>
                  <td>{{ fileItem.uploadedAt }}</td>
                  <td class="actions-cell">
                    <a
                      v-if="fileItem.publicUrl"
                      :href="fileItem.publicUrl"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="action-btn action-bio"
                    >
                      View / Download
                    </a>
                    <button
                      type="button"
                      class="action-btn action-delete"
                      @click="deleteScannedFile(fileItem)"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- ========================================
         ADD / EDIT EMPLOYEE MODAL
    ======================================== -->
    <div
      v-if="isFormModalOpen"
      class="modal-backdrop"
      @click.self="isFormModalOpen = false"
    >
      <div class="modal-panel modal-lg">
        <div class="modal-header">
          <h2>{{ editingId ? 'Edit Employee Record' : 'Register New Employee' }}</h2>
          <button
            type="button"
            class="close-btn"
            @click="isFormModalOpen = false"
          >
            &times;
          </button>
        </div>

        <form
          class="modal-body"
          @submit.prevent="saveEmployee"
        >
          <h3 class="form-section-title">1. Personal Information</h3>
          <div class="form-grid-3">
            <div class="form-field">
              <label>Last Name *</label>
              <input
                v-model="form.lastName"
                type="text"
                class="form-input"
                required
              >
            </div>

            <div class="form-field">
              <label>First Name *</label>
              <input
                v-model="form.firstName"
                type="text"
                class="form-input"
                required
              >
            </div>

            <div class="form-field">
              <label>Middle Name</label>
              <input
                v-model="form.middleName"
                type="text"
                class="form-input"
              >
            </div>

            <div class="form-field">
              <label>Date of Birth</label>
              <input
                v-model="form.dateOfBirth"
                type="date"
                class="form-input"
              >
            </div>

            <div class="form-field">
              <label>Gender</label>
              <select
                v-model="form.gender"
                class="form-select"
              >
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div class="form-field">
              <label>Civil Status</label>
              <select
                v-model="form.civilStatus"
                class="form-select"
              >
                <option value="Single">Single</option>
                <option value="Married">Married</option>
                <option value="Widowed">Widowed</option>
                <option value="Separated">Separated</option>
              </select>
            </div>

            <div class="form-field">
              <label>Email Address *</label>
              <input
                v-model="form.email"
                type="email"
                class="form-input"
                required
              >
            </div>

            <div class="form-field">
              <label>Contact Number</label>
              <input
                v-model="form.phone"
                type="text"
                class="form-input"
              >
            </div>

            <div class="form-field">
              <label>Nationality</label>
              <input
                v-model="form.nationality"
                type="text"
                class="form-input"
              >
            </div>
          </div>

          <div class="form-grid-2 mt-12">
            <div class="form-field">
              <label>Complete Residential Address *</label>
              <input
                v-model="form.address"
                type="text"
                class="form-input"
                required
              >
            </div>

            <div class="form-field">
              <label>Emergency Contact Person &amp; Phone</label>
              <input
                v-model="form.emergencyContact"
                type="text"
                class="form-input"
              >
            </div>
          </div>

          <h3 class="form-section-title">2. Employment, Designation &amp; Salary</h3>
          <div class="form-grid-3">
            <div class="form-field">
              <label>Employee ID Code</label>
              <input
                v-model="form.employeeCode"
                type="text"
                class="form-input"
              >
            </div>

            <div class="form-field">
              <label>Position / Job Title *</label>
              <input
                v-model="form.position"
                type="text"
                class="form-input"
                required
              >
            </div>

            <div class="form-field">
              <label>Designation *</label>
              <input
                v-model="form.designation"
                type="text"
                class="form-input"
                required
              >
            </div>

            <div class="form-field">
              <label>Department</label>
              <input
                v-model="form.department"
                type="text"
                class="form-input"
              >
            </div>

            <div class="form-field">
              <label>Date Hired *</label>
              <input
                v-model="form.dateHired"
                type="date"
                class="form-input"
                required
              >
            </div>

            <div class="form-field">
              <label>Employment Status</label>
              <select
                v-model="form.employmentStatus"
                class="form-select"
              >
                <option value="Regular">Regular</option>
                <option value="Probationary">Probationary</option>
                <option value="Contractual">Contractual</option>
                <option value="Part-Time">Part-Time</option>
              </select>
            </div>

            <div class="form-field">
              <label>Basic Monthly Salary (PHP) *</label>
              <input
                v-model.number="form.salary"
                type="number"
                min="0"
                step="100"
                class="form-input"
                required
              >
            </div>

            <div class="form-field span-2">
              <label>Payroll Bank / Account Details</label>
              <input
                v-model="form.bankAccount"
                type="text"
                class="form-input"
              >
            </div>
          </div>

          <h3 class="form-section-title">3. Bio-Data, Credentials &amp; Statutory IDs</h3>
          <div class="form-grid-3">
            <div class="form-field">
              <label>Highest Educational Attainment</label>
              <input
                v-model="form.highestEducation"
                type="text"
                class="form-input"
              >
            </div>

            <div class="form-field">
              <label>School / University</label>
              <input
                v-model="form.school"
                type="text"
                class="form-input"
              >
            </div>

            <div class="form-field">
              <label>Year Graduated</label>
              <input
                v-model="form.yearGraduated"
                type="text"
                class="form-input"
              >
            </div>
          </div>

          <div class="form-grid-2 mt-12">
            <div class="form-field">
              <label>Clinical Skills &amp; Licenses</label>
              <textarea
                v-model="form.skills"
                rows="2"
                class="form-textarea"
              />
            </div>

            <div class="form-field">
              <label>Previous Work Experience</label>
              <textarea
                v-model="form.workExperience"
                rows="2"
                class="form-textarea"
              />
            </div>
          </div>

          <div class="form-grid-4 mt-12">
            <div class="form-field">
              <label>TIN Number</label>
              <input
                v-model="form.tinNumber"
                type="text"
                class="form-input"
              >
            </div>

            <div class="form-field">
              <label>SSS Number</label>
              <input
                v-model="form.sssNumber"
                type="text"
                class="form-input"
              >
            </div>

            <div class="form-field">
              <label>PhilHealth Number</label>
              <input
                v-model="form.philhealthNumber"
                type="text"
                class="form-input"
              >
            </div>

            <div class="form-field">
              <label>Pag-IBIG MID</label>
              <input
                v-model="form.pagibigNumber"
                type="text"
                class="form-input"
              >
            </div>
          </div>

          <div class="form-field mt-12">
            <label>HR Bio-Data Remarks</label>
            <textarea
              v-model="form.bioRemarks"
              rows="2"
              class="form-textarea"
            />
          </div>

          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline"
              @click="isFormModalOpen = false"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="btn btn-primary"
            >
              {{ editingId ? 'Save Changes' : 'Save Employee Record' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- ========================================
         PRINTABLE BIO-DATA MODAL
    ======================================== -->
    <div
      v-if="isBioModalOpen && selectedEmployee"
      class="modal-backdrop"
      @click.self="isBioModalOpen = false"
    >
      <div class="modal-panel modal-lg printable-area">
        <div class="modal-header no-print">
          <h2>Official Employee Bio-Data Sheet</h2>
          <div class="bio-header-actions">
            <button
              type="button"
              class="btn btn-primary btn-small"
              @click="printBioSheet"
            >
              Print Bio-Data
            </button>
            <button
              type="button"
              class="close-btn"
              @click="isBioModalOpen = false"
            >
              &times;
            </button>
          </div>
        </div>

        <div class="bio-sheet">
          <div class="bio-banner">
            <div>
              <span class="bio-org">HOMEMEDIX HEALTHCARE SERVICES</span>
              <h3>EMPLOYEE PERSONNEL BIO-DATA</h3>
            </div>
            <div class="bio-id-box">
              <span>EMPLOYEE ID</span>
              <strong>{{ selectedEmployee.employeeCode }}</strong>
            </div>
          </div>

          <div class="bio-section">
            <h4>I. PERSONAL DATA</h4>
            <div class="bio-grid">
              <div>
                <span class="bio-label">Full Name</span>
                <p>
                  {{ selectedEmployee.lastName }}, {{ selectedEmployee.firstName }}
                  {{ selectedEmployee.middleName }}
                </p>
              </div>
              <div>
                <span class="bio-label">Date of Birth</span>
                <p>{{ selectedEmployee.dateOfBirth || '—' }}</p>
              </div>
              <div>
                <span class="bio-label">Gender / Civil Status</span>
                <p>{{ selectedEmployee.gender }} · {{ selectedEmployee.civilStatus }}</p>
              </div>
              <div>
                <span class="bio-label">Nationality</span>
                <p>{{ selectedEmployee.nationality || '—' }}</p>
              </div>
              <div>
                <span class="bio-label">Email Address</span>
                <p>{{ selectedEmployee.email }}</p>
              </div>
              <div>
                <span class="bio-label">Contact Number</span>
                <p>{{ selectedEmployee.phone || '—' }}</p>
              </div>
              <div class="span-2">
                <span class="bio-label">Residential Address</span>
                <p>{{ selectedEmployee.address }}</p>
              </div>
              <div class="span-2">
                <span class="bio-label">Emergency Contact</span>
                <p>{{ selectedEmployee.emergencyContact || '—' }}</p>
              </div>
            </div>
          </div>

          <div class="bio-section">
            <h4>II. EMPLOYMENT &amp; COMPENSATION RECORD</h4>
            <div class="bio-grid">
              <div>
                <span class="bio-label">Position</span>
                <p>{{ selectedEmployee.position }}</p>
              </div>
              <div>
                <span class="bio-label">Designation</span>
                <p>{{ selectedEmployee.designation }}</p>
              </div>
              <div>
                <span class="bio-label">Department</span>
                <p>{{ selectedEmployee.department }}</p>
              </div>
              <div>
                <span class="bio-label">Employment Status</span>
                <p>{{ selectedEmployee.employmentStatus }}</p>
              </div>
              <div>
                <span class="bio-label">Date Hired</span>
                <p>{{ selectedEmployee.dateHired }}</p>
              </div>
              <div>
                <span class="bio-label">Basic Monthly Salary</span>
                <p>{{ formatCurrency(selectedEmployee.salary) }}</p>
              </div>
              <div class="span-2">
                <span class="bio-label">Payroll Account</span>
                <p>{{ selectedEmployee.bankAccount || '—' }}</p>
              </div>
            </div>
          </div>

          <div class="bio-section">
            <h4>III. EDUCATIONAL BACKGROUND, SKILLS &amp; WORK HISTORY</h4>
            <div class="bio-grid">
              <div>
                <span class="bio-label">Highest Education</span>
                <p>{{ selectedEmployee.highestEducation || '—' }}</p>
              </div>
              <div>
                <span class="bio-label">School &amp; Year Graduated</span>
                <p>
                  {{ selectedEmployee.school || '—' }}
                  <span v-if="selectedEmployee.yearGraduated">
                    ({{ selectedEmployee.yearGraduated }})
                  </span>
                </p>
              </div>
              <div class="span-2">
                <span class="bio-label">Skills &amp; Licenses</span>
                <p>{{ selectedEmployee.skills || '—' }}</p>
              </div>
              <div class="span-2">
                <span class="bio-label">Previous Work Experience</span>
                <p>{{ selectedEmployee.workExperience || '—' }}</p>
              </div>
            </div>
          </div>

          <div class="bio-section">
            <h4>IV. GOVERNMENT IDENTIFIERS &amp; HR REMARKS</h4>
            <div class="bio-grid">
              <div>
                <span class="bio-label">TIN</span>
                <p>{{ selectedEmployee.tinNumber || '—' }}</p>
              </div>
              <div>
                <span class="bio-label">SSS</span>
                <p>{{ selectedEmployee.sssNumber || '—' }}</p>
              </div>
              <div>
                <span class="bio-label">PhilHealth</span>
                <p>{{ selectedEmployee.philhealthNumber || '—' }}</p>
              </div>
              <div>
                <span class="bio-label">Pag-IBIG</span>
                <p>{{ selectedEmployee.pagibigNumber || '—' }}</p>
              </div>
              <div class="span-2">
                <span class="bio-label">HR Remarks</span>
                <p>{{ selectedEmployee.bioRemarks || 'None' }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.ems-section {
  padding: 48px 0 80px;
  background: #f7f9fc;
  min-height: 100vh;
  color: #243656;
}

.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

.ems-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 24px;
  margin-bottom: 28px;
  flex-wrap: wrap;
}

.ems-eyebrow {
  display: inline-block;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: #173779;
  margin-bottom: 6px;
}

.ems-title {
  margin: 0 0 8px;
  font-size: 30px;
  font-weight: 700;
  color: #1a3575;
}

.ems-subtitle {
  margin: 0;
  font-size: 15px;
  color: #4f6284;
  max-width: 640px;
}

.ems-header-actions {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 44px;
  padding: 0 20px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  border: 1px solid transparent;
  transition: background 0.2s ease, transform 0.2s ease, border-color 0.2s ease;
}

.btn-primary {
  background: #173779;
  color: #ffffff;
}

.btn-primary:hover {
  background: #102d64;
  transform: translateY(-1px);
}

.btn-outline {
  background: #ffffff;
  color: #173779;
  border-color: #cfd8e8;
}

.btn-outline:hover {
  border-color: #173779;
  background: #f0f4fb;
}

.btn-small {
  min-height: 38px;
  padding: 0 16px;
  font-size: 13px;
}

.w-full {
  width: 100%;
}

.kpi-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 24px;
}

.kpi-card {
  background: #ffffff;
  border: 1px solid #e4eaf3;
  border-radius: 8px;
  padding: 20px 24px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.kpi-label {
  font-size: 13px;
  font-weight: 600;
  color: #54688a;
}

.kpi-value {
  font-size: 26px;
  font-weight: 700;
  color: #173779;
}

.kpi-meta {
  font-size: 12px;
  color: #7788a5;
}

.toolbar-card {
  background: #ffffff;
  border: 1px solid #e4eaf3;
  border-radius: 8px;
  padding: 16px 20px;
  margin-bottom: 20px;
  display: flex;
  gap: 16px;
  justify-content: space-between;
  flex-wrap: wrap;
}

.search-box {
  flex: 1;
  min-width: 260px;
}

.filter-group {
  display: flex;
  gap: 12px;
}

.form-input,
.form-select,
.form-textarea {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #d5dfec;
  border-radius: 6px;
  font-size: 14px;
  color: #1c2e4a;
  background: #ffffff;
  font-family: inherit;
}

.form-input:focus,
.form-select:focus,
.form-textarea:focus {
  outline: none;
  border-color: #173779;
}

.table-card {
  background: #ffffff;
  border: 1px solid #e4eaf3;
  border-radius: 8px;
  overflow: hidden;
}

.table-responsive {
  width: 100%;
  overflow-x: auto;
}

.ems-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

.ems-table th {
  background: #f1f5fb;
  color: #1a3575;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  padding: 14px 16px;
  border-bottom: 1px solid #e4eaf3;
}

.ems-table td {
  padding: 16px;
  border-bottom: 1px solid #eef2f8;
  font-size: 14px;
  vertical-align: top;
}

.ems-table tr:hover td {
  background: #fafcff;
}

.emp-badge {
  display: inline-block;
  padding: 4px 8px;
  background: #eaf0fa;
  color: #173779;
  font-weight: 700;
  font-size: 12px;
  border-radius: 4px;
}

.emp-name {
  font-weight: 700;
  color: #1a3575;
  margin-bottom: 3px;
}

.emp-position {
  font-weight: 600;
  color: #243656;
  margin-bottom: 3px;
}

.emp-sub {
  font-size: 13px;
  color: #54688a;
}

.emp-address {
  font-size: 12px;
  color: #7788a5;
  margin-top: 2px;
}

.emp-salary {
  font-weight: 700;
  color: #173779;
}

.whitespace-nowrap {
  white-space: nowrap;
}

.text-right {
  text-align: right;
}

.status-pill {
  display: inline-block;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 700;
}

.status-regular {
  background: #e6f6ee;
  color: #156f42;
}

.status-probationary {
  background: #fff6e0;
  color: #9a6700;
}

.status-contractual,
.status-part-time {
  background: #eef2f8;
  color: #3d5174;
}

.actions-cell {
  white-space: nowrap;
  text-align: right;
}

.action-btn {
  display: inline-block;
  padding: 6px 10px;
  margin-left: 6px;
  border-radius: 5px;
  font-size: 12px;
  font-weight: 700;
  border: 1px solid #d5dfec;
  background: #ffffff;
  cursor: pointer;
  text-decoration: none;
}

.action-bio {
  color: #173779;
}

.action-bio:hover {
  background: #eef3fb;
}

.action-edit {
  color: #243656;
}

.action-edit:hover {
  background: #f2f4f8;
}

.action-delete {
  color: #b42318;
  border-color: #f3d0cd;
}

.action-delete:hover {
  background: #fef3f2;
}

.empty-state {
  text-align: center;
  padding: 36px 20px;
  color: #54688a;
}

/* DOSSIER TABS & SUB-CARDS */
.dossier-tabs {
  display: flex;
  border-bottom: 1px solid #e4eaf3;
  background: #f8fafd;
  padding: 0 24px;
  gap: 8px;
}

.tab-btn {
  padding: 14px 18px;
  border: none;
  background: transparent;
  font-size: 14px;
  font-weight: 700;
  color: #54688a;
  cursor: pointer;
  border-bottom: 3px solid transparent;
}

.tab-btn.active {
  color: #173779;
  border-bottom-color: #173779;
}

.sub-card {
  background: #f8fafd;
  border: 1px solid #e4eaf3;
  border-radius: 8px;
  padding: 18px;
}

.flex-end {
  display: flex;
  align-items: flex-end;
}

.upload-status {
  margin: 10px 0 0;
  font-size: 13px;
  font-weight: 600;
  color: #173779;
}

/* MODAL & FORM GRIDS */
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(15, 29, 58, 0.55);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.modal-panel {
  background: #ffffff;
  border-radius: 10px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 45px rgba(10, 25, 55, 0.25);
}

.modal-lg {
  max-width: 920px;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 24px;
  border-bottom: 1px solid #e8edf5;
  position: sticky;
  top: 0;
  background: #ffffff;
  z-index: 10;
}

.modal-header h2 {
  margin: 0;
  font-size: 20px;
  color: #1a3575;
}

.bio-header-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.close-btn {
  background: transparent;
  border: none;
  font-size: 28px;
  line-height: 1;
  color: #54688a;
  cursor: pointer;
}

.modal-body {
  padding: 20px 24px 28px;
}

.form-section-title {
  margin: 20px 0 12px;
  padding-bottom: 6px;
  border-bottom: 1px solid #e8edf5;
  font-size: 15px;
  font-weight: 700;
  color: #173779;
}

.form-section-title:first-child {
  margin-top: 0;
}

.form-grid-2 {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 14px;
}

.form-grid-3 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
}

.form-grid-4 {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px;
}

.span-2 {
  grid-column: span 2;
}

.mt-12 {
  margin-top: 12px;
}

.mt-20 {
  margin-top: 20px;
}

.form-field label {
  display: block;
  font-size: 12px;
  font-weight: 700;
  color: #34466b;
  margin-bottom: 5px;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 24px;
  padding-top: 16px;
  border-top: 1px solid #e8edf5;
}

/* BIO-DATA SHEET */
.bio-sheet {
  padding: 28px;
}

.bio-banner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 16px;
  border-bottom: 2px solid #173779;
  margin-bottom: 20px;
}

.bio-org {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: #54688a;
}

.bio-banner h3 {
  margin: 4px 0 0;
  font-size: 20px;
  color: #173779;
}

.bio-id-box {
  text-align: right;
  background: #f1f5fb;
  padding: 8px 14px;
  border-radius: 6px;
}

.bio-id-box span {
  display: block;
  font-size: 10px;
  font-weight: 700;
  color: #54688a;
}

.bio-id-box strong {
  font-size: 15px;
  color: #173779;
}

.bio-section {
  margin-bottom: 20px;
}

.bio-section h4 {
  margin: 0 0 10px;
  font-size: 13px;
  font-weight: 700;
  color: #173779;
  background: #f1f5fb;
  padding: 6px 10px;
  border-radius: 4px;
}

.bio-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px 20px;
  padding: 0 6px;
}

.bio-label {
  display: block;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  color: #6b7d9c;
  margin-bottom: 2px;
}

.bio-grid p {
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  color: #1c2e4a;
}

@media (max-width: 850px) {
  .kpi-grid,
  .form-grid-3,
  .form-grid-4,
  .form-grid-2,
  .bio-grid {
    grid-template-columns: 1fr;
  }

  .span-2 {
    grid-column: span 1;
  }
}

@media print {
  body * {
    visibility: hidden;
  }

  .printable-area,
  .printable-area * {
    visibility: visible;
  }

  .printable-area {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    max-height: none;
    box-shadow: none;
  }

  .no-print {
    display: none !important;
  }
}
</style>