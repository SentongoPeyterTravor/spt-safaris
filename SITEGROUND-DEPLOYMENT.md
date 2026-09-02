# SPT Safaris: SiteGround deployment checklist

This is a **plain static HTML/CSS/JavaScript website**. It does not require Node.js, PHP, a database, or a build command. Upload the contents of this project directly to the document root of the domain.

## Upload location

In SiteGround, open **Site Tools → Site → File Manager** and open the document root for the domain. For the primary domain this is usually `public_html`; for an addon domain, SiteGround shows the assigned folder. Upload the **contents** of `spt-safaris-org` into that folder, not an extra enclosing `spt-safaris-org` directory.

The root should contain `index.html`, `about.html`, `contact.html`, `css/`, `js/`, `images/`, the other HTML pages, `.htaccess`, `robots.txt`, and `404.html`.

If SiteGround asks whether to overwrite files, overwrite the existing site files only after downloading a backup first. Keep `.htaccess` enabled and make sure hidden files are displayed during upload.

## SSL and domain

Activate the domain SSL certificate in **Site Tools → Security → SSL Manager**, then enable **HTTPS Enforce** only after the certificate is active. The included `.htaccess` also redirects HTTP traffic to HTTPS and adds caching, compression, a custom 404 page, and basic security headers.

Confirm that both the bare domain and `www` version resolve as intended. Choose one canonical version in SiteGround’s HTTPS/domain settings and redirect the other to it.

## Contact form requirement

The contact form uses EmailJS from the browser. After deployment, open `contact.html` and submit a real test message. Confirm that:

1. EmailJS allows the production domain in its security or allowed-origins settings.
2. The EmailJS service, template, and public key in `js/email.js` are active.
3. The message arrives at `sptsafaritours@gmail.com` or the recipient configured in the EmailJS template.
4. The success and error messages appear correctly.

EmailJS public browser keys are not passwords, but the service should still have domain restrictions and rate limits enabled.

## Final smoke test

Test the homepage, every top navigation item, the Tours dropdown, each featured-tour detail link, the contact form, the WhatsApp button, telephone links on a phone, and the responsive mobile menu. Open browser developer tools and confirm there are no 404 requests for CSS, JavaScript, images, or favicon files.

## Optional GitHub deployment

The existing `.github/workflows/deploy.yml` is **not a SiteGround deployment configuration**. It assumes a separate VPS with SSH access at `/var/www/spt-safaris`. Do not rely on it unless that server path and the GitHub secrets are intentionally configured. For SiteGround, File Manager or SFTP is the correct upload method.

## Windows PowerShell note

The earlier command failed because it was a Bash command pasted into PowerShell 5. PowerShell does not accept a command beginning with `&&`, and `find -maxdepth`, `head`, `printf`, and `grep -R` are Bash syntax. Use the SiteGround File Manager for upload, or use PowerShell commands such as:

```powershell
Set-Location 'C:\Users\starx\Desktop\spt safaris\spt-safaris-org'
Get-ChildItem -Recurse -File | Select-Object -First 250 FullName
git status --short
Get-ChildItem -Recurse -Filter *.html | Select-String -Pattern '<form|href=|src='
```
