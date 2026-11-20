# Release 1 test results (issue #110)

Build: production export (`pnpm build` -> `out/`) served with `serve out -l 4173`, Chromium (Playwright), commit e021b43. Matrix: light/dark x 320/375/1280 px. Automated by one Playwright script; every check below was executed, not assumed.

## #95 Rename on navigation

### 95-1: PASS
- Checked:
  - / light: nav brand = "Jordan Walker"
  - hero greeting 'Jordan Ellis' present=true, portrait alt 'Jordan Ellis' present=true
  - /story light: nav brand = "Jordan Walker"
  - / dark: nav brand = "Jordan Walker"
  - hero greeting 'Jordan Ellis' present=true, portrait alt 'Jordan Ellis' present=true
  - /story dark: nav brand = "Jordan Walker"
- Screenshots: `95-1-home-light-1280.png`, `95-1-story-light-1280.png`, `95-1-home-dark-1280.png`, `95-1-story-dark-1280.png`

### 95-2: PASS
- Checked:
  - clicked brand on /story -> /
- Screenshots: `95-2-home-after-click-light-1280.png`

### 95-3: PASS
- Checked:
  - / light 320: one line, not clipped, no h-scroll, toggle+menu visible
  - /story light 320: one line, not clipped, no h-scroll, toggle+menu visible
  - / light 375: one line, not clipped, no h-scroll, toggle+menu visible
  - /story light 375: one line, not clipped, no h-scroll, toggle+menu visible
  - / dark 320: one line, not clipped, no h-scroll, toggle+menu visible
  - /story dark 320: one line, not clipped, no h-scroll, toggle+menu visible
  - / dark 375: one line, not clipped, no h-scroll, toggle+menu visible
  - /story dark 375: one line, not clipped, no h-scroll, toggle+menu visible
- Screenshots: `95-3-home-light-320.png`, `95-3-story-light-320.png`, `95-3-home-light-375.png`, `95-3-story-light-375.png`, `95-3-home-dark-320.png`, `95-3-story-dark-320.png`, `95-3-home-dark-375.png`, `95-3-story-dark-375.png`

## #98 Clickable Beyond-work cards, category and post pages

### 98-1: PASS
- Checked:
  - Beyond work section with cards captured
  - card "Travel: read stories" -> /story/travel
  - card "Sport: read stories" -> /story/sport
  - card "Photography: read stories" -> /story/photography
- Screenshots: `98-1-beyond-work-cards-light-1280.png`, `98-1-travel-landing-light-1280.png`, `98-1-sport-landing-light-1280.png`, `98-1-photography-landing-light-1280.png`

### 98-2: PASS
- Checked:
  - light: 3 cards, 'Read stories' hint on all=true, hover border rgb(226, 229, 235)->rgb(58, 71, 213), transform none, cursor=pointer
  - light: focus style outline="solid 3px rgb(58, 71, 213)" border=rgb(58, 71, 213) shadow=none
  - dark: 3 cards, 'Read stories' hint on all=true, hover border rgb(43, 48, 60)->rgb(148, 160, 255), transform none, cursor=pointer
  - dark: focus style outline="solid 3px rgb(148, 160, 255)" border=rgb(148, 160, 255) shadow=none
- Screenshots: `98-2-hover-light-1280.png`, `98-2-focus-light-1280.png`, `98-2-hover-dark-1280.png`, `98-2-focus-dark-1280.png`

### 98-3: PASS
- Checked:
  - light: reached first card after 10 Tab presses; Enter -> /story/travel
  - light: Tab order of cards = travel, sport, photography
  - dark: reached first card after 10 Tab presses; Enter -> /story/travel
  - dark: Tab order of cards = travel, sport, photography
- Screenshots: `98-3-focused-card-light-1280.png`, `98-3-after-enter-light-1280.png`, `98-3-focused-card-dark-1280.png`, `98-3-after-enter-dark-1280.png`

### 98-4: PASS
- Checked:
  - /story/travel light 320: 2 posts [Slow trains and street food in Huế | Walking Lisbon by tram line]; no h-scroll, images load, no empty state
  - /story/travel light 375: 2 posts [Slow trains and street food in Huế | Walking Lisbon by tram line]; no h-scroll, images load, no empty state
  - /story/travel light 1280: 2 posts [Slow trains and street food in Huế | Walking Lisbon by tram line]; no h-scroll, images load, no empty state
  - card details: [cover=true date=true location=true readtime=true] October 1, 2026 / Huế, Vietnam / Slow trains and street food in Huế / Four days of bún bò, clay-pot rice and the slow train from Da Nang, with no plan beyond the next meal. / 1 min read || [cover=true date=true location=true readtime=true] June 15, 2026 / Lisbon, Portugal / Walking Lisbon by tram line / I picked t
  - back link to My story present
  - tags/text seen: City walks, Local food, Trains
  - category intro matches card text: "I plan trips around local food and slow train rides. Every new city gives me ideas for the next interface I build."
  - /story/travel dark 320: 2 posts [Slow trains and street food in Huế | Walking Lisbon by tram line]; no h-scroll, images load, no empty state
  - /story/travel dark 375: 2 posts [Slow trains and street food in Huế | Walking Lisbon by tram line]; no h-scroll, images load, no empty state
  - /story/travel dark 1280: 2 posts [Slow trains and street food in Huế | Walking Lisbon by tram line]; no h-scroll, images load, no empty state
- Screenshots: `98-4-travel-light-320.png`, `98-4-travel-light-375.png`, `98-4-travel-light-1280.png`, `98-4-travel-dark-320.png`, `98-4-travel-dark-375.png`, `98-4-travel-dark-1280.png`

### 98-5: PASS
- Checked:
  - /story/cooking: HTTP 404, page text: "Skip to content Jordan Walker Error 404 Page not found The page you are looking for does not exist or has moved. Back to"
- Screenshots: `98-5-404-light-1280.png`

### 98-6: PASS
- Checked:
  - /story/travel/hue-food-and-trains light 320: title="Slow trains and street food in Huế", h2s=[Eating my way through town | What I took home | Photo gallery], paragraphs=5, images/covers=4, figcaptions=1, gallery=2 items
  - /story/travel/hue-food-and-trains light 375: title="Slow trains and street food in Huế", h2s=[Eating my way through town | What I took home | Photo gallery], paragraphs=5, images/covers=4, figcaptions=1, gallery=2 items
  - /story/travel/hue-food-and-trains light 1280: title="Slow trains and street food in Huế", h2s=[Eating my way through town | What I took home | Photo gallery], paragraphs=5, images/covers=4, figcaptions=1, gallery=2 items
  - meta line: "October 1, 2026 / Huế, Vietnam"
  - prev/next nav present=true
  - viewport shots top/body/bottom
  - /story/travel/hue-food-and-trains dark 1280: title="Slow trains and street food in Huế", h2s=[Eating my way through town | What I took home | Photo gallery], paragraphs=5, images/covers=4, figcaptions=1, gallery=2 items
  - /story/travel/lisbon-tram-walks light 320: title="Walking Lisbon by tram line", h2s=[Small finds], paragraphs=3, images/covers=1, figcaptions=0, gallery=none
  - /story/travel/lisbon-tram-walks light 375: title="Walking Lisbon by tram line", h2s=[Small finds], paragraphs=3, images/covers=1, figcaptions=0, gallery=none
  - /story/travel/lisbon-tram-walks light 1280: title="Walking Lisbon by tram line", h2s=[Small finds], paragraphs=3, images/covers=1, figcaptions=0, gallery=none
  - meta line: "June 15, 2026 / Lisbon, Portugal"
  - prev/next nav present=true
  - viewport shots top/body/bottom
  - /story/travel/lisbon-tram-walks dark 1280: title="Walking Lisbon by tram line", h2s=[Small finds], paragraphs=3, images/covers=1, figcaptions=0, gallery=none
- Screenshots: `98-6-hue-food-and-trains-light-320.png`, `98-6-hue-food-and-trains-light-375.png`, `98-6-hue-food-and-trains-light-1280.png`, `98-6-top-hue-food-and-trains-light-1280.png`, `98-6-body-hue-food-and-trains-light-1280.png`, `98-6-bottom-hue-food-and-trains-light-1280.png`, `98-6-hue-food-and-trains-dark-1280.png`, `98-6-lisbon-tram-walks-light-320.png`, `98-6-lisbon-tram-walks-light-375.png`, `98-6-lisbon-tram-walks-light-1280.png`, `98-6-top-lisbon-tram-walks-light-1280.png`, `98-6-body-lisbon-tram-walks-light-1280.png`, `98-6-bottom-lisbon-tram-walks-light-1280.png`, `98-6-lisbon-tram-walks-dark-1280.png`

### 98-7a: PASS
- Checked:
  - /story/travel/no-such-post: HTTP 404, page text: "Skip to content Jordan Walker Error 404 Page not found The page you are looking for does not exist or has moved. Back to"
- Screenshots: `98-7a-404-light-1280.png`

### 98-7b: PASS
- Checked:
  - /story/sport/hue-food-and-trains: HTTP 404, page text: "Skip to content Jordan Walker Error 404 Page not found The page you are looking for does not exist or has moved. Back to"
- Screenshots: `98-7b-404-light-1280.png`

### 98-8: PASS
- Checked:
  - post back link -> /story/travel (links on post: ← Back to Travel | Next →Walking Lisbon by tram line)
  - category back link -> /story
- Screenshots: `98-8-1-post-light-1280.png`, `98-8-2-category-light-1280.png`, `98-8-3-story-light-1280.png`

### 98-9: PASS
- Checked:
  - 12 pages: 12 unique titles, 12 unique descriptions (98-9-page-titles.txt); internal links crawled=12, broken=0 
- Screenshots: `98-9-page-titles.txt`, `98-9-category-tab-title-light-1280.png`

### 98-10: PASS
- Checked:
  - axe (wcag2a/2aa/21a/21aa) /story/travel light: no serious/critical issues
  - axe (wcag2a/2aa/21a/21aa) /story/travel/hue-food-and-trains light: no serious/critical issues
  - axe (wcag2a/2aa/21a/21aa) /story/travel dark: no serious/critical issues
  - axe (wcag2a/2aa/21a/21aa) /story/travel/hue-food-and-trains dark: no serious/critical issues
- Screenshots: `98-10-axe-travel-light-1280.png`, `98-10-axe-travel-hue-food-and-trains-light-1280.png`, `98-10-axe-travel-dark-1280.png`, `98-10-axe-travel-hue-food-and-trains-dark-1280.png`

## #101 / #102 Sport page

### 102-1: PASS
- Checked:
  - /story/sport light 320: 2 posts [Morning runs along the Perfume River | Weekend badminton doubles]; no h-scroll, images load, no empty state
  - /story/sport light 375: 2 posts [Morning runs along the Perfume River | Weekend badminton doubles]; no h-scroll, images load, no empty state
  - /story/sport light 1280: 2 posts [Morning runs along the Perfume River | Weekend badminton doubles]; no h-scroll, images load, no empty state
  - card details: [cover=true date=true location=true readtime=true] September 12, 2026 / Huế city, Vietnam / Morning runs along the Perfume River / Three mornings a week, five kilometres at sunrise, and the one habit that makes the rest of my day easier. / 1 min read || [cover=true date=true location=true readtime=true] July 20, 2026 / Da Nang, Vietnam / Weekend badminton doubles 
  - back link to My story present
  - tags/text seen: Running, Badminton
  - tag Running visible=true
  - /story/sport dark 320: 2 posts [Morning runs along the Perfume River | Weekend badminton doubles]; no h-scroll, images load, no empty state
  - /story/sport dark 375: 2 posts [Morning runs along the Perfume River | Weekend badminton doubles]; no h-scroll, images load, no empty state
  - /story/sport dark 1280: 2 posts [Morning runs along the Perfume River | Weekend badminton doubles]; no h-scroll, images load, no empty state
- Screenshots: `102-1-sport-light-320.png`, `102-1-sport-light-375.png`, `102-1-sport-light-1280.png`, `102-1-sport-dark-320.png`, `102-1-sport-dark-375.png`, `102-1-sport-dark-1280.png`

### 102-2: PASS
- Checked:
  - /story/sport/morning-run-along-the-river light 320: title="Morning runs along the Perfume River", h2s=[The route | What it teaches me | Photo gallery], paragraphs=5, images/covers=4, figcaptions=1, gallery=2 items
  - /story/sport/morning-run-along-the-river light 375: title="Morning runs along the Perfume River", h2s=[The route | What it teaches me | Photo gallery], paragraphs=5, images/covers=4, figcaptions=1, gallery=2 items
  - /story/sport/morning-run-along-the-river light 1280: title="Morning runs along the Perfume River", h2s=[The route | What it teaches me | Photo gallery], paragraphs=5, images/covers=4, figcaptions=1, gallery=2 items
  - meta line: "September 12, 2026 / Huế city, Vietnam"
  - prev/next nav present=true
  - viewport shots top/body/bottom
  - /story/sport/morning-run-along-the-river dark 1280: title="Morning runs along the Perfume River", h2s=[The route | What it teaches me | Photo gallery], paragraphs=5, images/covers=4, figcaptions=1, gallery=2 items
  - body headings=3, has list=true, figures (inline+gallery)=2
- Screenshots: `102-2-morning-run-along-the-river-light-320.png`, `102-2-morning-run-along-the-river-light-375.png`, `102-2-morning-run-along-the-river-light-1280.png`, `102-2-top-morning-run-along-the-river-light-1280.png`, `102-2-body-morning-run-along-the-river-light-1280.png`, `102-2-bottom-morning-run-along-the-river-light-1280.png`, `102-2-morning-run-along-the-river-dark-1280.png`

### 102-3: PASS
- Checked:
  - /story/sport/weekend-badminton-doubles light 320: title="Weekend badminton doubles", h2s=[Why I keep coming back], paragraphs=3, images/covers=1, figcaptions=0, gallery=none
  - /story/sport/weekend-badminton-doubles light 375: title="Weekend badminton doubles", h2s=[Why I keep coming back], paragraphs=3, images/covers=1, figcaptions=0, gallery=none
  - /story/sport/weekend-badminton-doubles light 1280: title="Weekend badminton doubles", h2s=[Why I keep coming back], paragraphs=3, images/covers=1, figcaptions=0, gallery=none
  - meta line: "July 20, 2026 / Da Nang, Vietnam"
  - prev/next nav present=true
  - viewport shots top/body/bottom
  - /story/sport/weekend-badminton-doubles dark 1280: title="Weekend badminton doubles", h2s=[Why I keep coming back], paragraphs=3, images/covers=1, figcaptions=0, gallery=none
- Screenshots: `102-3-weekend-badminton-doubles-light-320.png`, `102-3-weekend-badminton-doubles-light-375.png`, `102-3-weekend-badminton-doubles-light-1280.png`, `102-3-top-weekend-badminton-doubles-light-1280.png`, `102-3-body-weekend-badminton-doubles-light-1280.png`, `102-3-bottom-weekend-badminton-doubles-light-1280.png`, `102-3-weekend-badminton-doubles-dark-1280.png`

### 102-4: PASS
- Checked:
  - /story/sport: 2 images, broken=0 
  - /story/sport/morning-run-along-the-river: 4 images, broken=0 
  - /story/sport/weekend-badminton-doubles: 1 images, broken=0 
- Screenshots: `102-4-images-sport-light-1280.png`, `102-4-images-morning-run-along-the-river-light-1280.png`, `102-4-images-weekend-badminton-doubles-light-1280.png`

### 102-5: PASS
- Checked:
  - post 1 (morning-run-along-the-river): Previous=null, Next=/story/sport/weekend-badminton-doubles
  - post 2 (weekend-badminton-doubles): Previous=/story/sport/morning-run-along-the-river, Next=null
  - forward via "Next" from morning-run-along-the-river -> weekend-badminton-doubles (expected weekend-badminton-doubles)
  - back via "Previous" -> morning-run-along-the-river (expected morning-run-along-the-river)
  - end posts have no link in the empty direction: true
- Screenshots: `102-5-post1-nav-light-1280.png`, `102-5-post2-nav-light-1280.png`, `102-5-forward-step1-light-1280.png`, `102-5-back-step1-light-1280.png`

### 102-6: PASS
- Checked:
  - axe (wcag2a/2aa/21a/21aa) /story/sport light: no serious/critical issues
  - axe (wcag2a/2aa/21a/21aa) /story/sport/morning-run-along-the-river light: no serious/critical issues
  - axe (wcag2a/2aa/21a/21aa) /story/sport/weekend-badminton-doubles light: no serious/critical issues
  - axe (wcag2a/2aa/21a/21aa) /story/sport dark: no serious/critical issues
  - axe (wcag2a/2aa/21a/21aa) /story/sport/morning-run-along-the-river dark: no serious/critical issues
  - axe (wcag2a/2aa/21a/21aa) /story/sport/weekend-badminton-doubles dark: no serious/critical issues
- Screenshots: `102-6-axe-sport-light-1280.png`, `102-6-axe-sport-morning-run-along-the-river-light-1280.png`, `102-6-axe-sport-weekend-badminton-doubles-light-1280.png`, `102-6-axe-sport-dark-1280.png`, `102-6-axe-sport-morning-run-along-the-river-dark-1280.png`, `102-6-axe-sport-weekend-badminton-doubles-dark-1280.png`

### 102-7: PASS
- Checked:
  - /story/sport/hue-food-and-trains: HTTP 404, page text: "Skip to content Jordan Walker Error 404 Page not found The page you are looking for does not exist or has moved. Back to"
- Screenshots: `102-7-404-light-1280.png`

## #105 Photography page

### 105-1: FAIL
- Checked:
  - /story/photography light 320: 3 posts [One roll of film in Huế | Golden hour on the river | A day in the darkroom]; no h-scroll, images load, no empty state
  - /story/photography light 375: 3 posts [One roll of film in Huế | Golden hour on the river | A day in the darkroom]; no h-scroll, images load, no empty state
  - /story/photography light 1280: 3 posts [One roll of film in Huế | Golden hour on the river | A day in the darkroom]; no h-scroll, images load, no empty state
  - card details: [cover=true date=true location=true readtime=true] September 20, 2026 / Huế, Vietnam / One roll of film in Huế / Thirty-six frames, one old camera and a morning of walking the streets without checking the screen. / 1 min read || [cover=true date=true location=false readtime=true] July 12, 2026 / Golden hour on the river / The best light of the day lasts about twen
  - back link to My story present
  - tags/text seen: Film, Street
  - /story/photography dark 320: 3 posts [One roll of film in Huế | Golden hour on the river | A day in the darkroom]; no h-scroll, images load, no empty state
  - /story/photography dark 375: 3 posts [One roll of film in Huế | Golden hour on the river | A day in the darkroom]; no h-scroll, images load, no empty state
  - /story/photography dark 1280: 3 posts [One roll of film in Huế | Golden hour on the river | A day in the darkroom]; no h-scroll, images load, no empty state
- Reason for Fail:
  - post 2 card ('Golden hour on the river') shows no location: its front matter in content/story/photography/golden-hour-river.mdx has no `location` field
  - post 3 card ('A day in the darkroom') shows no location: no `location` field in day-in-the-darkroom.mdx. The plan expects every card to show a location; the other 105-1 checks (3 posts, order, cover, date, reading time, no empty state, no h-scroll) passed. File a bug or confirm that location is optional for these posts.
- Screenshots: `105-1-photography-light-320.png`, `105-1-photography-light-375.png`, `105-1-photography-light-1280.png`, `105-1-photography-dark-320.png`, `105-1-photography-dark-375.png`, `105-1-photography-dark-1280.png`

### 105-2: PASS
- Checked:
  - images: frames-of-hue/cover.jpg 1200px, golden-hour-river/cover.jpg 1200px, day-in-the-darkroom/cover.jpg 1200px
- Screenshots: `105-2-covers-light-1280.png`

### 105-3: PASS
- Checked:
  - /story/photography/frames-of-hue light 320: title="One roll of film in Huế", h2s=[Rules for the roll | Photo gallery], paragraphs=5, images/covers=4, figcaptions=1, gallery=2 items
  - /story/photography/frames-of-hue light 375: title="One roll of film in Huế", h2s=[Rules for the roll | Photo gallery], paragraphs=5, images/covers=4, figcaptions=1, gallery=2 items
  - /story/photography/frames-of-hue light 1280: title="One roll of film in Huế", h2s=[Rules for the roll | Photo gallery], paragraphs=5, images/covers=4, figcaptions=1, gallery=2 items
  - meta line: "September 20, 2026 / Huế, Vietnam"
  - prev/next nav present=true
  - viewport shots top/body/bottom
  - /story/photography/frames-of-hue dark 1280: title="One roll of film in Huế", h2s=[Rules for the roll | Photo gallery], paragraphs=5, images/covers=4, figcaptions=1, gallery=2 items
  - non-gallery images (cover + body) = 2, gallery items=2
  - mid-post/figure image captured
  - gallery captured
- Screenshots: `105-3-frames-of-hue-light-320.png`, `105-3-frames-of-hue-light-375.png`, `105-3-frames-of-hue-light-1280.png`, `105-3-top-frames-of-hue-light-1280.png`, `105-3-body-frames-of-hue-light-1280.png`, `105-3-bottom-frames-of-hue-light-1280.png`, `105-3-frames-of-hue-dark-1280.png`, `105-3-mid-post-image-light-1280.png`, `105-3-gallery-light-1280.png`

### 105-4: PASS
- Checked:
  - /story/photography/golden-hour-river light 320: title="Golden hour on the river", h2s=[What I look for], paragraphs=3, images/covers=1, figcaptions=0, gallery=none
  - /story/photography/golden-hour-river light 375: title="Golden hour on the river", h2s=[What I look for], paragraphs=3, images/covers=1, figcaptions=0, gallery=none
  - /story/photography/golden-hour-river light 1280: title="Golden hour on the river", h2s=[What I look for], paragraphs=3, images/covers=1, figcaptions=0, gallery=none
  - meta line: "July 12, 2026"
  - prev/next nav present=true
  - viewport shots top/body/bottom
  - /story/photography/golden-hour-river dark 1280: title="Golden hour on the river", h2s=[What I look for], paragraphs=3, images/covers=1, figcaptions=0, gallery=none
  - /story/photography/day-in-the-darkroom light 320: title="A day in the darkroom", h2s=[Lessons from the trays | Photo gallery], paragraphs=3, images/covers=4, figcaptions=1, gallery=3 items
  - /story/photography/day-in-the-darkroom light 375: title="A day in the darkroom", h2s=[Lessons from the trays | Photo gallery], paragraphs=3, images/covers=4, figcaptions=1, gallery=3 items
  - /story/photography/day-in-the-darkroom light 1280: title="A day in the darkroom", h2s=[Lessons from the trays | Photo gallery], paragraphs=3, images/covers=4, figcaptions=1, gallery=3 items
  - meta line: "April 5, 2026"
  - prev/next nav present=true
  - viewport shots top/body/bottom
  - /story/photography/day-in-the-darkroom dark 1280: title="A day in the darkroom", h2s=[Lessons from the trays | Photo gallery], paragraphs=3, images/covers=4, figcaptions=1, gallery=3 items
- Screenshots: `105-4-golden-hour-river-light-320.png`, `105-4-golden-hour-river-light-375.png`, `105-4-golden-hour-river-light-1280.png`, `105-4-top-golden-hour-river-light-1280.png`, `105-4-body-golden-hour-river-light-1280.png`, `105-4-bottom-golden-hour-river-light-1280.png`, `105-4-golden-hour-river-dark-1280.png`, `105-4-day-in-the-darkroom-light-320.png`, `105-4-day-in-the-darkroom-light-375.png`, `105-4-day-in-the-darkroom-light-1280.png`, `105-4-top-day-in-the-darkroom-light-1280.png`, `105-4-body-day-in-the-darkroom-light-1280.png`, `105-4-bottom-day-in-the-darkroom-light-1280.png`, `105-4-day-in-the-darkroom-dark-1280.png`

### 105-5: PASS
- Checked:
  - post 1 (frames-of-hue): Previous=null, Next=/story/photography/golden-hour-river
  - post 2 (golden-hour-river): Previous=/story/photography/frames-of-hue, Next=/story/photography/day-in-the-darkroom
  - post 3 (day-in-the-darkroom): Previous=/story/photography/golden-hour-river, Next=null
  - forward via "Next" from frames-of-hue -> golden-hour-river (expected golden-hour-river)
  - forward via "Next" from golden-hour-river -> day-in-the-darkroom (expected day-in-the-darkroom)
  - back via "Previous" -> golden-hour-river (expected golden-hour-river)
  - back via "Previous" -> frames-of-hue (expected frames-of-hue)
  - end posts have no link in the empty direction: true
- Screenshots: `105-5-post1-nav-light-1280.png`, `105-5-post2-nav-light-1280.png`, `105-5-post3-nav-light-1280.png`, `105-5-forward-step1-light-1280.png`, `105-5-forward-step2-light-1280.png`, `105-5-back-step1-light-1280.png`, `105-5-back-step2-light-1280.png`

### 105-6: PASS
- Checked:
  - /story/travel: empty state shown=false
  - /story/sport: empty state shown=false
  - /story/photography: empty state shown=false
- Screenshots: `105-6-travel-light-1280.png`, `105-6-sport-light-1280.png`, `105-6-photography-light-1280.png`

### 105-7: PASS
- Checked:
  - axe (wcag2a/2aa/21a/21aa) /story/photography light: no serious/critical issues
  - axe (wcag2a/2aa/21a/21aa) /story/photography/frames-of-hue light: no serious/critical issues
  - axe (wcag2a/2aa/21a/21aa) /story/photography/golden-hour-river light: no serious/critical issues
  - axe (wcag2a/2aa/21a/21aa) /story/photography/day-in-the-darkroom light: no serious/critical issues
  - axe (wcag2a/2aa/21a/21aa) /story/photography dark: no serious/critical issues
  - axe (wcag2a/2aa/21a/21aa) /story/photography/frames-of-hue dark: no serious/critical issues
  - axe (wcag2a/2aa/21a/21aa) /story/photography/golden-hour-river dark: no serious/critical issues
  - axe (wcag2a/2aa/21a/21aa) /story/photography/day-in-the-darkroom dark: no serious/critical issues
- Screenshots: `105-7-axe-photography-light-1280.png`, `105-7-axe-photography-frames-of-hue-light-1280.png`, `105-7-axe-photography-golden-hour-river-light-1280.png`, `105-7-axe-photography-day-in-the-darkroom-light-1280.png`, `105-7-axe-photography-dark-1280.png`, `105-7-axe-photography-frames-of-hue-dark-1280.png`, `105-7-axe-photography-golden-hour-river-dark-1280.png`, `105-7-axe-photography-day-in-the-darkroom-dark-1280.png`

## #110 Cross-cutting checks

### theme-persistence: PASS
- Checked:
  - /: starts light=yes, toggled dark=true, after reload dark=true, localStorage=dark, dark class at every readyState with stored dark=true [interactive:true,complete:true]
  - /story: starts light=yes, toggled dark=true, after reload dark=true, localStorage=dark, dark class at every readyState with stored dark=true [interactive:true,complete:true]
  - /story/travel: starts light=yes, toggled dark=true, after reload dark=true, localStorage=dark, dark class at every readyState with stored dark=true [interactive:true,complete:true]
  - /story/travel/hue-food-and-trains: starts light=yes, toggled dark=true, after reload dark=true, localStorage=dark, dark class at every readyState with stored dark=true [interactive:true,complete:true]
- Screenshots: `theme-home-1-light-1280.png`, `theme-home-2-toggled-dark-1280.png`, `theme-home-3-after-reload-dark-1280.png`, `theme-story-1-light-1280.png`, `theme-story-2-toggled-dark-1280.png`, `theme-story-3-after-reload-dark-1280.png`, `theme-story-travel-1-light-1280.png`, `theme-story-travel-2-toggled-dark-1280.png`, `theme-story-travel-3-after-reload-dark-1280.png`, `theme-story-travel-hue-food-and-trains-1-light-1280.png`, `theme-story-travel-hue-food-and-trains-2-toggled-dark-1280.png`, `theme-story-travel-hue-food-and-trains-3-after-reload-dark-1280.png`

## Cross-cutting

- Console errors on all pages visited: the only entries are the browser's "Failed to load resource: 404" line for the four intentional 404 URLs (/story/cooking, /story/travel/no-such-post, /story/sport/hue-food-and-trains x2). No other console error, page error, failed request or 4xx/5xx asset on any page: PASS.
- '[PLACEHOLDER]' text: scanned all 12 pages, none found: PASS.
- Theme toggle, reload persistence, no flash: see #110 section above (screenshots `110/theme-*`).

## Not covered / limits

- Lighthouse was not run (no Lighthouse available); #98-10 and #105-7 used axe (WCAG 2.0/2.1 A and AA), which is the plan's alternative. No numeric Lighthouse score exists.
- The live GitHub Pages demo (/my-portfolio basePath) was not checked; only the local `out/` was.
- Headless screenshots have no browser tab or network panel. Page titles and meta descriptions are recorded in `98/98-9-page-titles.txt`; console/network results are summarised above.
- Hover check: the border colour changes and the cursor is a pointer; no translateY lift was measured (the plan accepts "border or lift").
- Sandbox note: Chromium needed locally unpacked system libraries and fonts to run; nothing in the repo was changed.

## Summary

FAILED cases: 105 105-1. All other cases passed.
