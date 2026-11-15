# Rui Shi's Personal Website

Academic homepage at **https://ruishi-cmu.github.io/**.

Source repository: https://github.com/ruishi-cmu/ruishi-cmu.github.io. The original https://jerrysiri.github.io/ is retained as a redirect entry point, with existing public PDF downloads preserved.

The site uses the HTML, stylesheet, publication cards, project cloud, cursor assets, and landscape footer from [w-r-s/academic-homepage-template](https://github.com/w-r-s/academic-homepage-template). It replaces the previous Academic Pages / Jekyll implementation with the reference template's static architecture. No Node, Ruby, Jekyll, package installation, or build step is required.

## Preview

From this directory, run:

```sh
python3 -m http.server 4000 --bind 127.0.0.1
```

Then open http://127.0.0.1:4000/.

## Editing

- `index.html` contains the biography, 19 news events, 7 publications and manuscripts, education, research and internships, projects, and academic service.
- `stylesheet.css` starts with the reference stylesheet and its publication controls. The final section adds personal content styling and responsive fixes.
- `script.js` adapts the reference project cloud and handles publication filters, author-list expansion, news expansion, active section navigation, copying the short bio, and back-to-top behavior.
- `images/` contains the portrait, actual publication previews, repository graphics, talk cover, and original template assets.
- `files/Resume_SHI_Rui.pdf` is the current public resume. `files/CV_SHI_Rui.pdf` contains the same version to keep the previous download URL current.
- `files/Modern-Agent-Self-Evolving.pdf` contains the invited-talk slides. Existing personal PDF URLs remain available.

News is written newest first. The template's compact date-badge list shows the first three items. The button's older-event count is recalculated by JavaScript. Update its initial text when editing the news so it also reads correctly before scripts load.

Publication filter tags are `self-evolving`, `rl`, and `biomedical`. Keep the corresponding `data-tags` attributes on each publication row. The page content is present in the HTML and does not depend on JavaScript or the GitHub API to load. The default All view displays a uniform four-column grid with equal-size cards on desktop and three columns on mobile. Selecting a thumbnail opens its original figure, author list, venue and links in a native dialog. Selecting a research category restores the detailed publication list.

## GitHub Pages

The organization homepage repository is **ruishi-cmu/ruishi-cmu.github.io**. Serve the root directory of branch **main** in Settings > Pages. `.nojekyll` serves this static template directly. No custom domain or `CNAME` is needed.

The legacy repository **JerrySiRi/JerrySiRi.github.io** retains its existing publishing branch. It serves immediate static redirects to the new homepage and corresponding sections. Its existing `files/` downloads remain available so old links in resumes and papers continue to work.

## Search discovery

The homepage includes a descriptive title containing “Rui Shi's Personal Website”, a description, a canonical URL, Open Graph metadata, and `WebSite`, `ProfilePage`, and `Person` structured data. `robots.txt` permits crawling and points to `sitemap.xml`. The canonical address is **https://ruishi-cmu.github.io/**.

After publication, verify `https://ruishi-cmu.github.io/` in [Google Search Console](https://search.google.com/search-console/), submit `sitemap.xml`, and request indexing of the homepage. Existing profiles and future resumes should link to the new URL. No verification token is included because it must be issued for the owner's account. Titles and structured data do not guarantee indexing, ranking, or an exact search result.

Google's [redirect documentation](https://developers.google.com/search/docs/crawling-indexing/301-redirects) explains the instant meta-refresh redirects used by the legacy static site. The [SEO starter guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide) explains discovery and indexing.

## Content sources and decisions

Updated on November 15, 2026 from the supplied research resume and finance resume. The reviewer cycle is **October 2026**, as confirmed by the owner.

- [WeAct](https://arxiv.org/abs/2610.26847), including the public author list and first preprint date in October 2026. ARR submission status comes from the resume.
- [Leanabell-Prover-V2](https://arxiv.org/abs/2507.08649) and its [repository](https://github.com/Leanabell-LM/Leanabell-Prover-V2). The project graphic is the repository's `figures/teaser.png`.
- [MedPMC](https://arxiv.org/abs/2607.07673). Its review status comes from the resume and is displayed as under review, not accepted.
- [The Development Landscape of LLMs for Biomedical Applications](https://doi.org/10.1146/annurev-biodatasci-102224-074736), including its public author list.
- [ForgeTrain](https://github.com/OpenBMB/ForgeTrain) and [MiniCPM](https://github.com/OpenBMB/MiniCPM). Their graphics come from the repositories' `assets/logo.png` and `assets/minicpm_logo.png`. The page describes the owner's contributions using the resume and does not claim authorship of the ForgeTrain technical report or copy changing star counts.
- The supplied Lite-Me-LLaMA, Impact of Context, and NOBL manuscripts supply their exact titles and author lists. Lite-Me-LLaMA's AMIA 2025 status follows the latest resume. NOBL is labelled as a research manuscript rather than assigning it an unconfirmed publication venue.
- The resume's Lite-Me-LLaMA link points to the Impact of Context PDF. The homepage instead links to the correct existing `MedLLaMA_8B.pdf` manuscript.
- The resume's clinical-trial decomposition item points to NOBL. Its text-to-SQL and RAG contributions are included under Yale experience. It is not assigned that unrelated PDF or the author list of another public paper with a similar title.
- The invited talk title, CityU affiliation, and March 17, 2026 date are visible on the supplied slides.

The retained `LICENSE` belongs to the previous Academic Pages implementation. Attribution for the reference template and imported research assets is recorded above and on the homepage.

## Layout and figure update

News uses the reference template's inline date badges and shows the three newest entries. Education and Internships share two columns; Academic Reviewing and Invited Talk use the same two-column structure. Both collapse to one column on narrow screens. XM Capital Management and its related news entries were removed at the owner's request.

Publication images are extracted from the articles, not from their first pages:

| Publication | Representative visual |
| --- | --- |
| WeAct | Figure 2, capability learning and tool-mediated inference |
| Leanabell-Prover-V2 | Figure 4, verifier-integrated theorem proving framework, extracted from the original paper |
| MedPMC | Figure 1, data curation and multimodal model training |
| Lite-Me-LLaMA | Table 4, supervised model comparison; the supplied manuscript contains no standalone figures |
| Biomedical LLM Landscape | Figure 2, training corpora and domains, extracted from the publisher’s final PDF (page 11, journal page 261) |
| Clinical NER Context | Figure 1, sentence, section and note context |
| NOBL | Figure 1, the hierarchical novelty taxonomy |

The MiniCPM 5 project uses the repository's original `assets/minicpm_logo.png`. The Projects section contains only ForgeTrain and MiniCPM 5, using their official GitHub logos.

School and employer graphics come from NJU's university archives, HKU's official site, the CityU mark embedded in the supplied slides, ModelBest's MiniCPM repository, Kuaishou's official favicon, and Shanghai AI Lab's official header. CMU's seal is mirrored in a university-opportunity listing; Yale's shield is from the cited public logo asset. They identify the institutions in the supplied experience, not an endorsement.

The site is published from the `ruishi-cmu` organization. Canonical tags, structured data, sharing metadata, robots, sitemap, and the copied bio use `https://ruishi-cmu.github.io/`. The legacy website is maintained separately as a redirect rather than transferring its repository.

### Final publication artwork update

The CMU full-color seal is the 600×600 original used by CMU's Multicomp course site, downloaded from `https://cmu-multicomp-lab.github.io/mmml-course/assets/img/cmu-logo.png`. Kuaishou uses the publisher's 512×512 App Store artwork, retrieved through Apple's lookup API for app 440948110. Shanghai AI Lab is listed as a standalone internship; NJU remains only in education and the independently sourced biography. Paper thumbnail cards use matching widths, image-region heights and title-region heights so every row and column aligns. Complete scientific figures remain visible without stretching.

### Published figure and alignment correction

The prior biomedical-landscape thumbnail came from an earlier author manuscript. It has been replaced with Figure 2 from the publisher's final 24-page PDF, downloaded through the Annual Reviews article page. The final figure uses counts 50, 21, 15, 11 and 8, and is displayed in its original colors without a CSS color filter. The published PDF itself includes gradient shading. All-view cards now use a uniform grid and aligned title baselines.

Shanghai AI Lab now uses the official site's blue artwork from `https://www.shlab.org.cn/static/img/logo_2.5957e86a.webp`, displayed on white without recoloring.
