# 🚀 Guía de Publicación
## Opciones para Publicar tu Aplicación de Física

---

## 🏆 OPCIÓN RECOMENDADA: Vercel

### ¿Por qué Vercel?

✅ **Ventajas:**
- **Creador de Next.js** - Optimizado específicamente para Next.js
- **Totalmente GRATIS** para proyectos personales/educativos
- **Deploy automático** desde GitHub en segundos
- **HTTPS automático** con certificado SSL incluido
- **CDN global** - tu sitio será rápido en todo el mundo
- **Preview deployments** - cada commit tiene su preview
- **Dominio gratis** - tu-proyecto.vercel.app
- **Análisis incluido** - métricas de rendimiento
- **Zero configuration** - funciona sin configuración adicional

❌ **Limitaciones (Plan Gratis):**
- 100GB de ancho de banda/mes (suficiente para miles de usuarios)
- 100 builds/día
- No puedes usar dominio personalizado premium (pero .vercel.app está bien)

### 📋 Pasos para Publicar en Vercel

#### 1️⃣ Preparar el Repositorio en GitHub

```bash
# Si aún no tienes Git configurado:
git init
git add .
git commit -m "Initial commit - Algo de Fisica lab 1"

# Crear repositorio en GitHub (https://github.com/new)
# Luego conectarlo:
git remote add origin https://github.com/TU-USUARIO/TU-REPO.git
git branch -M main
git push -u origin main
```

#### 2️⃣ Crear Cuenta en Vercel

1. Ve a https://vercel.com/signup
2. Regístrate con tu cuenta de GitHub (recomendado)
3. Autoriza a Vercel para acceder a tus repositorios

#### 3️⃣ Importar Proyecto

1. Click en "Add New..." → "Project"
2. Selecciona tu repositorio de GitHub
3. Vercel detectará automáticamente que es Next.js
4. **IMPORTANTE:** Configura las variables de entorno:
   - Click en "Environment Variables"
   - Agrega: `OPENAI_API_KEY` = tu-api-key (si tienes)
   - Deja las demás configuraciones por defecto

#### 4️⃣ Deploy

1. Click en "Deploy"
2. Espera 2-3 minutos mientras Vercel:
   - Instala dependencias
   - Ejecuta build
   - Despliega a CDN global
3. ✅ ¡Listo! Tu app estará en `https://tu-proyecto.vercel.app`

#### 5️⃣ Configuraciones Post-Deploy (Opcional)

**Dominio personalizado:**
- Settings → Domains → Add Domain
- Puedes usar uno gratis de Vercel o conectar tu propio dominio

**Analytics:**
- Ya están incluidos automáticamente
- Ve a Analytics tab para ver métricas

**Variables de Entorno:**
- Settings → Environment Variables
- Puedes actualizar sin hacer redeploy

### 🔄 Actualizaciones Automáticas

Después del deploy inicial, cada vez que hagas:
```bash
git add .
git commit -m "Mejora X"
git push
```

Vercel automáticamente:
1. Detecta el cambio
2. Hace build
3. Despliega la nueva versión
4. ✅ Tu sitio se actualiza en ~2 minutos

---

## 🥈 ALTERNATIVA 2: Netlify

### ¿Por qué Netlify?

✅ **Ventajas:**
- También gratis para proyectos personales
- Interfaz muy amigable
- Buenos analytics
- Formularios gratuitos (útil para contacto)
- CDN global

❌ **Desventajas vs Vercel:**
- No tan optimizado para Next.js como Vercel
- Configuración puede necesitar ajustes
- Menos integración con el ecosistema Next.js

### 📋 Pasos para Netlify

1. Crea cuenta en https://netlify.com
2. "Add new site" → "Import from Git"
3. Conecta GitHub y selecciona tu repo
4. Build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
5. Variables de entorno en "Site settings" → "Environment variables"
6. Deploy

---

## 🥉 ALTERNATIVA 3: Railway

### ¿Por qué Railway?

✅ **Ventajas:**
- Gratis $5/mes de crédito (suficiente para empezar)
- Soporta bases de datos si necesitas agregar después
- Muy fácil de usar

❌ **Desventajas:**
- Límite de créditos mensuales
- No tan rápido como Vercel

### 📋 Pasos para Railway

1. Crea cuenta en https://railway.app
2. "New Project" → "Deploy from GitHub repo"
3. Selecciona tu repositorio
4. Railway detecta Next.js automáticamente
5. Agrega variables de entorno
6. Deploy

---

## ⚡ ALTERNATIVA 4: Cloudflare Pages

### ¿Por qué Cloudflare?

✅ **Ventajas:**
- Totalmente gratis sin límites
- CDN súper rápido
- Buena para contenido estático

❌ **Desventajas:**
- Next.js requiere configuración adicional
- No soporta todas las features de Next.js (API routes limitadas)

---

## 🎯 MI RECOMENDACIÓN FINAL

### Para tu proyecto: **VERCEL** 🏆

**Razones:**

1. **Es el creador de Next.js** - Compatibilidad 100%
2. **Totalmente gratis** para tu caso de uso
3. **Cero configuración** - funciona out-of-the-box
4. **Deploy en 2 minutos** desde GitHub
5. **HTTPS automático** - seguro por defecto
6. **Actualizaciones automáticas** - push y listo
7. **Performance óptimo** - optimizaciones de Next.js incluidas
8. **Dominio gratis** - algo-de-fisica.vercel.app

### 📊 Comparación Rápida

| Feature | Vercel | Netlify | Railway | Cloudflare |
|---------|--------|---------|---------|------------|
| Next.js Support | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ |
| Precio (Gratis) | ✅ | ✅ | ⚠️ Limited | ✅ |
| Facilidad | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ |
| Performance | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| Analytics | ✅ | ✅ | ⚠️ Basic | ✅ |
| Auto Deploy | ✅ | ✅ | ✅ | ✅ |

---

## 🔐 Antes de Publicar - Checklist

- [ ] Código en GitHub
- [ ] `.env.local` en `.gitignore` (NO subir API keys)
- [ ] Variables de entorno configuradas en Vercel
- [ ] Build local exitoso (`npm run build`)
- [ ] Tests de funcionalidad completos
- [ ] SEO configurado (ya está ✅)
- [ ] Imágenes optimizadas (ya están ✅)
- [ ] Responsive verificado (ya está ✅)

---

## 🎉 Después de Publicar

### Compartir tu proyecto:

1. **URL principal:** `https://algo-de-fisica.vercel.app`
2. **Compartir en redes sociales**
3. **Agregar a tu portafolio**
4. **Enviar a profesores/estudiantes**

### Monitorear:

1. **Vercel Dashboard** - ver visitas y performance
2. **GitHub** - ver commits y cambios
3. **Feedback de usuarios** - mejorar basado en comentarios

### Mantener:

```bash
# Hacer cambios
git add .
git commit -m "Fix: descripción del cambio"
git push

# Vercel despliega automáticamente en ~2 min
```

---

## 💡 Tips Extra

### Dominio Personalizado (Opcional)

Si quieres `algodefisica.com` en lugar de `.vercel.app`:

1. Compra dominio en Namecheap/GoDaddy (~$10-15/año)
2. En Vercel: Settings → Domains → Add
3. Configura DNS según instrucciones de Vercel
4. ✅ Tu dominio personalizado funcionará

### Analytics Avanzados (Opcional)

**Google Analytics gratis:**
```bash
npm install @next/third-parties
```

Agregar en `_app.tsx`:
```tsx
import { GoogleAnalytics } from '@next/third-parties/google'

// En el component
<GoogleAnalytics gaId="G-XXXXXXXXXX" />
```

### Optimización de Imágenes

Vercel automáticamente optimiza todas tus imágenes con Next.js Image Optimization.

---

## 🆘 Solución de Problemas

### Error: "Build Failed"

```bash
# Verifica local:
npm run build

# Si falla, revisa:
- Errores de TypeScript
- Imports faltantes
- Variables de entorno
```

### Error: "API Route not working"

- Asegúrate que `OPENAI_API_KEY` está en Environment Variables de Vercel
- No uses `process.env` en componentes de cliente

### Error: "Simulaciones 3D lentas"

- Normal en dispositivos antiguos
- Considera lazy loading: `dynamic(() => import(...), { ssr: false })`

---

## 📱 Pasos Específicos para TU Proyecto

### Opción 1: Deploy Inmediato (Recomendado)

```bash
# 1. Asegúrate que todo está en Git
git status
git add .
git commit -m "Ready for production"

# 2. Sube a GitHub
git push

# 3. Ve a Vercel.com
# - Login con GitHub
# - Import repository
# - Deploy (2 minutos)

# 4. ✅ Listo!
# Tu app estará en https://algo-de-fisica.vercel.app
```

### Opción 2: Deploy Manual (Alternativa)

```bash
# Si no quieres usar Git/GitHub:
npm install -g vercel
vercel login
vercel

# Sigue instrucciones en terminal
# ✅ Deploy directo desde tu computadora
```

---

## 🎓 Resumen

**Para publicar tu "Algo de Fisica lab 1":**

1. ✅ Usa **Vercel** (gratis, fácil, rápido)
2. ✅ Conecta tu repo de GitHub
3. ✅ Agrega `OPENAI_API_KEY` en variables de entorno
4. ✅ Click "Deploy"
5. ✅ Espera 2 minutos
6. ✅ **¡Tu app está online!**

**URL final:** `https://[tu-proyecto].vercel.app`

---

¿Necesitas ayuda con algún paso? ¡Avísame!

---

*Guía creada: Mayo 9, 2026*