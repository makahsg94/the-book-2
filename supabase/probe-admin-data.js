/**
 * فاحص تشخيصي — شغّله من كونسول المتصفح وأنت داخل كـ أدمن.
 *
 * الهدف: نعرف هل صف-progress في جدول user_data فاضي فعلاً، ولا فيه بيانات
 * وشكلها مختلف عن اللي الأدمن بيحاول يقراه.
 *
 * بيعمل 3 حاجات:
 *   1) يقرا الـ access token بتاعك من localStorage (Supabase بيخزّنه هناك)
 *   2) ينادي admin_data ويقول لك كام صف عنده data=null وكام عنده بيانات
 *   3) يجرّب يكتب صف تجريبي في user_data ويطبع رسالة الخطأ بالظبط لو فشل
 *
 * الخطوة: افتح /#/admin في الموقع، اضغط F12، تاب Console، الصق السكربت ده، Enter.
 * ملاحظة: مايكتبش حاجة، عدّى التحقق بيمسح الصف التجريبي لو نجح.
 */
;(async () => {
  const PROJECT = 'https://kxcyerjpznzpbgzcbfgh.supabase.co'
  const KEY = 'sb_publishable_sCNc7qTL0Lh0BPVyfC2MdQ_dwfo3npf'
  const STORAGE_KEY = 'sb-' + new URL(PROJECT).hostname.split('.')[0] + '-auth-token'

  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) {
    console.error(
      '[فاحص] ملقتش جلسة في localStorage تحت ' +
        STORAGE_KEY +
        '\nحالتك: إما مش داخل، أو Supabase مش مظبطة في الموقع (يبقى كل حاجة بتفضل localStorage).',
    )
    return
  }

  let token
  try {
    const parsed = JSON.parse(raw)
    token = parsed.access_token || parsed.currentSession?.access_token
  } catch {}
  if (!token) {
    console.error('[فاحص] الجلسة موجودة بس مفيش access_token — جرّب تعمل login تاني.')
    return
  }

  const H = { apikey: KEY, Authorization: 'Bearer ' + token, 'Content-Type': 'application/json' }
  const me = await fetch(PROJECT + '/auth/v1/user', { headers: H }).then((r) => r.json())
  console.log('[فاحص] انت داخل باسم:', me.user_metadata?.username, '| id:', me.id)

  // 1) نوري السجلات
  const res = await fetch(PROJECT + '/rest/v1/rpc/admin_data', { method: 'POST', headers: H, body: '{}' })
  const body = await res.json()

  if (!Array.isArray(body)) {
    console.error('[فاحص] admin_data رجّع:', body, '— يعني انت مش أدمن أو الدالة مش موجودة.')
    return
  }

  const withData = body.filter((r) => r.data && Object.keys(r.data).length > 0)
  const nullData = body.filter((r) => !r.data || Object.keys(r.data).length === 0)
  const PROGRESS_KEY = 'speakout-b1.progress.v1'
  const withProgress = withData.filter((r) => r.data[PROGRESS_KEY])

  console.log('%c=== نتيجة الفحص ===', 'font-weight:bold;font-size:14px')
  console.log('إجمالي الحسابات      :', body.length)
  console.log('عندها data فيها محتوى:', withData.length)
  console.log('عندها data = null/فاضي:', nullData.length)
  console.log('عندها مفتاح التقدم    :', withProgress.length, '  <-- لو ده 0 يبقى الجدول فاضي')

  if (withData.length) {
    const sample = withData.find((r) => r.data[PROGRESS_KEY]) || withData[0]
    console.log('مفاتيح أول صف عنده بيانات:', Object.keys(sample.data))
    console.log('عينة من بياناته:', JSON.stringify(sample.data).slice(0, 400))
  }
  if (nullData.length) {
    console.log('أمثلة صفوف فاضية:', nullData.slice(0, 5).map((r) => r.username).join(' | '))
  }

  // 2) نجرب كتابة صف تجريبي ونشوف الخطأ الحقيقي لو فيه
  console.log('%c--- اختبار الكتابة في user_data ---', 'font-weight:bold')
  const probeKey = '__diagnostic_probe__'
  const w = await fetch(PROJECT + '/rest/v1/user_data', {
    method: 'POST',
    headers: { ...H, Prefer: 'resolution=merge-duplicates,return=representation' },
    body: JSON.stringify([{ user_id: me.id, key: probeKey, value: { ok: true } }]),
  })
  const wText = await w.text()

  if (w.ok) {
    console.log('%cالكتابة نجحت ✅ — يعني RLS والجدول تمام، والمشكلة في حاجة تانية', 'color:green')
    await fetch(PROJECT + '/rest/v1/user_data?key=eq.' + probeKey, {
      method: 'DELETE',
      headers: H,
    })
    console.log('[فاحص] الصف التجريبي اتمسح.')
  } else {
    console.error('%cالكتابة فشلت ❌ — دي رسالة الخطأ الحقيقية:', 'color:red', w.status, wText)
  }

  console.log(
    '\n%d(C) لو 0 و 0: الجدول فاضي خالص والـ sync بيكتب localStorage بس.\n' +
      '       لو 0 و >0: البيانات موجودة — ابعتلي الـ "مفاتيح أول صف" و "عينة" فوق.',
    '',
  )
})()
