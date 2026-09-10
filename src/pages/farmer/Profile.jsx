import { useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'

export default function FarmerProfile() {
  const [fields, setFields] = useState([])
  const [profile, setProfile] = useState({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    axios.get('/api/profile').then(({ data }) => {
      setFields(data.fields || [])
      setProfile({ ...data.data, ...(data.data.profile || {}) })
    }).catch(() => toast.error('Could not load your profile')).finally(() => setLoading(false))
  }, [])

  const update = (id, value) => setProfile(current => ({ ...current, [id]: value }))
  const save = async event => {
    event.preventDefault()
    setSaving(true)
    try {
      const updates = Object.fromEntries(fields.filter(field => field.editable).map(field => [field.id, profile[field.id] ?? '']))
      const { data } = await axios.put('/api/profile', updates)
      setProfile(current => ({ ...current, ...data.data }))
      toast.success('Profile updated')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Could not save profile')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <div className="empty-state"><p>Loading your profile...</p></div>

  return (
    <div className="profile-page animate-fade-in">
      <div className="page-header"><div><p className="eyebrow">PERSONAL INFORMATION</p><h1>Your profile</h1><p>Keep your farmer and contact information current.</p></div></div>
      <form className="profile-form card" onSubmit={save}>
        {fields.map(field => (
          <div className="profile-field" key={field.id}>
            <label>{field.title}{field.required ? ' *' : ''}</label>
            {field.type === 'textarea' ? <textarea rows="4" value={profile[field.id] || ''} disabled={!field.editable} onChange={event => update(field.id, event.target.value)} /> : field.type === 'select' ? <select value={profile[field.id] || ''} disabled={!field.editable} onChange={event => update(field.id, event.target.value)}><option value="">Select</option>{(field.options || []).map(option => <option key={option}>{option}</option>)}</select> : <input type={field.type} value={profile[field.id] ?? ''} readOnly={!field.editable} onChange={event => update(field.id, event.target.value)} />}
            {!field.editable && <small>Managed by Sathya Bio</small>}
          </div>
        ))}
        <div className="profile-actions"><button className="btn btn-primary" disabled={saving}>{saving ? 'Saving...' : 'Save profile'}</button></div>
      </form>
    </div>
  )
}
