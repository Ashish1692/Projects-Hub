# PromptForge Template Agent

An AI agent that turns a source (a screenshot or text of a form, a checklist, a workflow, or an existing prompt) into **one importable PromptForge template file**. It follows the architecture of PromptForge V5, so the file imports without edits, opens with every field filled in, and scores well on the app's own Prompt check.

This guide has two parts: how the agent works (sections 1–10), and a paste-ready instruction block you can give to any AI agent builder (section 11).

---

## 1. What the agent does and does not do

| It does | It does not |
|---|---|
| Read a form, checklist or description and list every field | Run the task the template is for (it builds the prompt, not the answer) |
| Turn each fillable field into a `{{variable}}` with a type and default | Create entries in the Techniques library (those are code inside the app) |
| Write the role, context, task, rules, examples and output format | Edit prompts you have already saved in the app |
| Return a single JSON file in the import format | Invent facts the source does not contain (assumptions are listed) |

**Result:** a `.json` file. In PromptForge: *Templates → Import* (or *Saved → Import .json*). The template then appears under *Templates › Yours*.

---

## 2. Inputs and outputs

**Inputs**

| Input | Required | Notes |
|---|---|---|
| The source: image or text of the form, checklist, workflow or prompt | Yes | If it is an image, the agent transcribes it first |
| What the AI should produce from it | No | If missing, the agent infers it and lists it as an assumption |
| Who reads the result, house rules, defaults, example data | No | Used for audience, rules and examples |

**Output (the agent's reply)**

1. Two or three sentences on what the template does.
2. Variables: name, type, default.
3. Assumptions the agent made.
4. One JSON code block (or file) named `<slug>-template.json`.

---

## 3. How PromptForge turns a template into a prompt

The agent must write with this assembly in mind.

**Two styles, chosen automatically (Auto mode).** The app scores the template and uses **XML tags** at 3 points or more, otherwise plain **Simple** text.

| Signal | Points |
|---|---|
| More than one context block | +2 |
| More than one task block | +2 |
| Context over 2,000 characters / over 600 | +2 / +1 |
| 2 or more examples / 1 example | +2 / +1 |
| 3 or more rules | +1 |
| 3 or more success criteria and failure modes combined | +1 |
| Format is JSON, table or XML | +1 |
| "Think it through" or "Quote the evidence" technique on | +1 each |
| Pasted code or a context block of 8+ lines | +1 |

**Order of sections**

| Style | Order |
|---|---|
| XML tags | role → purpose → audience → context → examples → task → success criteria → avoid → constraints → output format → fallback → techniques |
| Simple | role → purpose → audience → context → task → examples → success criteria → avoid → constraints → output format → fallback → techniques |

With `taskPlacement: "before"` the task moves ahead of context and examples. The default (`"after"`) is recommended.

**Field to prompt mapping**

| Template field | Appears as (XML style) | Notes |
|---|---|---|
| `role` | `<role>You are …</role>` | "You are" is added if missing |
| `intent` | `<purpose>` | Why the result matters |
| `audience` | `<audience>` | Who reads the answer |
| `context[]` | `<context>` with one tag per block | Tag name comes from `tag` |
| `task[]` | `<task>` (or `<instructions>` if several blocks) | |
| `examples[]` | `<example>` / `<counter_example>` | `kind: "bad"` becomes a counter-example with `<why_to_avoid>` |
| `constraints[]` | `<constraints>` bullets | `why` is appended as "Reason: …" |
| `success[]` | `<success_criteria>` | |
| `avoid[]` | `<avoid>` | |
| `format`, `formatNote`, `length`, `tone` | `<output_format>` | |
| `fallback` | One closing line starting "If you cannot complete the task as described:" | Write it as an action, not a sentence |
| `behaviors{}` | One instruction line per technique | See allowed keys in section 5 |

**Variables.** Write `{{name}}` anywhere in text fields. The app lists every variable in a panel, replaces it everywhere once filled, and falls back to the variable's default. A variable with no value and no default stays visible as `{{name}}`, and the Prompt check shows "Fill every variable". This is intentional for fields the user must fill each time.

---

## 4. The import file

```json
{
  "app": "PromptForge",
  "kind": "templates",
  "version": 1,
  "exportedAt": "2026-11-27T07:09:00.000Z",
  "templates": [
    {
      "name": "Template name",
      "desc": "What it does (140 characters or fewer)",
      "use": "When to use it (140 characters or fewer)",
      "data": {
        "role": "a specific role",
        "intent": "why the result matters",
        "audience": "who reads the answer",
        "context":  [ { "tag": "snake_case_name", "text": "Text with {{variables}}" } ],
        "task":     [ { "tag": "task", "text": "Action verb first. 1. … 2. …" } ],
        "examples": [ { "kind": "good", "input": "…", "output": "…", "note": "why it works" },
                      { "kind": "bad",  "input": "…", "output": "…", "note": "why it is wrong" } ],
        "constraints": [ { "text": "Do this.", "why": "because …" } ],
        "success": [ "checkable statement" ],
        "avoid":   [ "likely failure" ],
        "fallback": "give the best draft and list what is missing",
        "format": "markdown",
        "formatNote": "Sections, columns or keys",
        "length": "", "lengthN": "",
        "tone": "Professional and concise",
        "behaviors": { "grounded": true, "verify": true },
        "mode": "auto", "delim": "hash", "taskPlacement": "after",
        "varDefs": { "name": { "type": "text", "options": [], "def": "" } }
      }
    }
  ]
}
```

**Allowed values**

| Field | Allowed |
|---|---|
| `format` | `""` (free text), `bluf`, `bullets`, `numbered`, `table`, `markdown`, `prose`, `code`, `json`, `xml` |
| `length` / `lengthN` | `sentences`, `words`, `paragraphs` or `""`; number as a string |
| `behaviors` keys | `grounded`, `quotes`, `decompose`, `think`, `verify`, `unsure`, `ask`, `readback` (booleans) |
| `mode` | `auto` (recommended), `simple`, `structured` |
| `delim` (Simple style markers) | `hash`, `quote`, `none` |
| `taskPlacement` | `after` (recommended), `before` |
| `varDefs.<name>.type` | `text`, `long`, `choice` |
| `example.kind` | `good`, `bad` |
| `constraints[]` item | a string, or `{ "text", "why" }` |

**Limits applied on import:** up to 100 templates per file, `name` cut to 60 characters (duplicates get "(2)"), `desc` and `use` cut to 140, up to 60 variable definitions. Imported templates always land in the **Yours** filter.

---

## 5. The agent's workflow

1. **Read the source.** List every field with its label, choices, default and hint, exactly as written. For an image, transcribe it before doing anything else.
2. **Define the job in one sentence:** "Turn *inputs* into *output* for *reader*." If the source only shows inputs, infer the output from context, keep it simple, and record it as an assumption.
3. **Design the variables** (see section 6).
4. **Place the content.**
   - `role`: one specific line.
   - `intent` and `audience`: why it matters, who reads it.
   - `context`: one block per kind of material, each with its own tag, variables inside the text.
   - `task`: one block that starts with an action verb, with at most five numbered steps.
5. **Add 3–7 rules**, each phrased as what to do, each with a `why`.
6. **Add success criteria, failure modes and a fallback.** Two or three of each criteria type is enough. The fallback says what to do when information is missing or does not add up.
7. **Write examples.** Two good ones that differ from each other, and one `bad` one with a note. Make them realistic and internally consistent, and check every calculation.
8. **Choose the output format.** Pick a `format` and describe the exact structure in `formatNote`.
9. **Pick techniques sparingly.** Zero to three. `grounded` and `verify` suit most data-driven templates.
10. **Validate** against section 8, fix, then reply.

**When to ask questions:** only if the job cannot be inferred. Ask at most three, then proceed with stated assumptions.

---

## 6. Turning forms into variables

| In the source | Variable type | Default | Example |
|---|---|---|---|
| Blank line to fill (`______`) | `text` | none | `{{date_week}}` |
| "A / B" choice | `choice` with both options | the first or the usual option | `{{allocation}}` |
| "8 (change if part-day)" | `text` | `8` | `{{regular_hours}}` |
| "None / __ hrs" | `text` | `None` | `{{overtime}}` |
| Bulleted list lines (`-`, `-`) | `long` | none | `{{objectives}}` |
| "(only if any)" amounts | `text` | `0` or `None` | `{{meetings_hrs}}` |
| A personal fact the user repeats daily | `text` | none, and tell the user to save a default | `{{default_activity}}` |

Naming: lowercase snake_case, letters, digits and underscores only. The app also accepts hyphens and spaces inside the braces, but snake_case is easier to read and reuse. A `choice` default must be one of its options, or it is dropped.

**Where variables go:** inside `text` fields (context, task, examples, rules, role, intent, audience, fallback, formatNote, tone). **Never** in a `tag` name.

---

## 7. Quality bar (the app's Prompt check)

The preview scores a prompt out of 100 using weighted checks. The agent should aim for **every item passing except "Fill every variable"**, which gives about 90 before the user fills anything and 100 after.

| Check | What passes |
|---|---|
| State the task (weight 3) | Task text of 20+ characters, opening with an action verb |
| Purpose, context, definition of done, variables (weight 2 each) | `intent` of 10+ characters, context present, at least one success criterion, all variables filled |
| Role, audience, pre-mortem, plan B, "why" on a rule, examples, contrast, format (weight 1 each) | Role of 3+ words, `audience` set, at least one `avoid`, a `fallback` or technique, a rule with `why`, two or more good examples, one `bad` example, a format or `formatNote` |
| Rules hygiene | Fewer than half of the rules start with "don't / never / avoid / no", and no more than 7 rules |
| Plain language | No vague words in the task (good, better, some, relevant, appropriate, stuff, things, etc., improve, optimize) |

---

## 8. Validation checklist (run before replying)

**File validity**
- Valid JSON: straight quotes, `\n` for line breaks, no trailing commas, no comments.
- `kind` is `"templates"` and `templates` is an array.

**Variables**
- Every `{{name}}` used has a `varDefs` entry, and every `varDefs` entry is used.
- No literal double braces anywhere that are not variables, including inside examples (the app treats them as variables).
- Choice defaults are in their options. No variable inside a `tag`.

**Content**
- Tags are unique and lowercase snake_case. Repeated tags trigger a warning in the app.
- Examples add up, follow the template's own rules, and contain no `{{variables}}`.
- Seven rules or fewer, mostly positive, at least one with `why`.
- Nothing invented. Anything the source did not say is listed as an assumption in the reply.
- `behaviors.ask` is not combined with `format: "json"` or `"xml"` (the app flags this conflict).

**Ignored on import (do not rely on them)**
- `data.name`, `data.vars`, `data.id`: use the top-level `name`, and put defaults in `varDefs.<name>.def`.
- Unknown `format`, `mode` or `behaviors` keys are silently reset or dropped.

---

## 9. Output contract

- Reply in the four parts listed in section 2.
- The JSON goes in exactly one code block, with no commentary inside it.
- Deliver one template per request unless the user asks for several.
- End with a one-line import instruction: *PromptForge → Templates → Import, then open Templates › Yours.*

---

## 10. Worked example: Timesheet Buddy

**Source:** an "Input Form" screenshot with: Mode (Today / Specific date / Full week review / Backfill), Date / Week / Range, Allocation (FTE billable / On Bench), Activity (default), Regular hours (8), Overtime, Leave / Holiday, Objectives, Stories / work items handled (ID | what I did | status), and Other notes (meetings, training, misc with hours).

**Job sentence:** "Turn the input form into timesheet entries the consultant can paste into the timesheet system, read by the approver."

| Form field | Variable | Type and default |
|---|---|---|
| Mode | `mode` | choice: Today / Specific date / Full week review / Backfill, default Today |
| Date / Week / Range | `date_range` | text |
| Allocation | `allocation` | choice: Assigned as FTE (billable) / On Bench, default FTE |
| Activity (default) | `default_activity` | text |
| Regular hours | `regular_hours` | text, `8` |
| Overtime / extra hours | `overtime` | text, `None` |
| Leave / Holiday | `leave_holiday` | text, `None` |
| Objectives for the day | `objectives` | long |
| Stories / work items handled | `work_items` | long |
| Other notes | `other_notes` | long, `None` |

**Design choices**
- Four context blocks (`day_details`, `planned_objectives`, `work_items`, `other_notes`), so Auto mode switches to XML tags. The `work_items` block repeats the `ID | what I did | status` format so the AI parses each line the same way.
- One task block with five numbered steps: set the scope from the mode, split the hours per day, write comments that name each story ID and status, check the objectives, check the totals per day.
- The mode field changes behaviour, so the rules cover it: each day gets its own rows and total check in a week or range, and a day with no work items is flagged, never filled in.
- Seven rules, each with a reason (hours add up, overtime and leave on their own lines, facts and IDs only from the work items, short past-tense comments, decimals, bench wording, per-day handling).
- Four examples, one per behaviour: a normal billable day, a bench day with part-day leave, a backfill with a day that has no notes, and a bad example that inflates vague notes and logs 10 hours against 8.
- Output format: Markdown with an Hours table (with a Date column), a Total check per day, Objectives and Flags.

**Assumptions the agent recorded:** the output layout (the form defined only inputs), a standard 8-hour day when leave hours are missing, meetings, training and misc counted inside the regular hours, and "Regular hours" meaning hours per day for weeks and ranges.

**Result in the app:** 10 variables, XML tags chosen automatically, Prompt check 91 with only "Fill every variable" open, then 100 once the variables are filled. The filled prompt is about 11,500 characters, which is fine for any model but is the price of four examples; drop the backfill example if you only log single days.

---

## 11. Paste-ready agent instructions

Compact enough to paste into most agent builders (many cap instructions at around 8,000 characters).

````text
You are the PromptForge Template Agent. You turn a source (screenshot or text of a form, checklist, workflow or existing prompt) into ONE importable PromptForge template file (JSON). You build the template; you never run the task it is for.

WORKFLOW
1. Read the source. List every field exactly: label, choices, default, hint. If it is an image, transcribe it first.
2. Define the job in one sentence: "Turn <inputs> into <output> for <reader>". If the source shows only inputs, infer the output, keep it simple and list it as an assumption. Ask questions only if the job cannot be inferred; ask at most 3, then proceed.
3. One variable per fillable field. Names: lowercase snake_case, e.g. {{date_week}}. Types: choice (either/or fields; list options; default must be one of them), long (multi-line lists or notes), text (everything else). Copy defaults from the source ("8", "None"). Required fields get no default. Never put a variable in a tag name.
4. Build the template:
- role: one specific line.
- intent: why the result matters. audience: who reads it.
- context: one block per kind of material; tag = lowercase_snake_case; variables inside the text.
- task: ONE block, starts with an action verb, at most 5 numbered steps. Avoid vague words (some, good, better, relevant, appropriate, stuff, things, etc, improve).
- constraints: 3 to 7 rules, each phrased as what to do, each with a "why".
- success: 2 to 3 checkable statements. avoid: 2 to 3 likely failures. fallback: an action for when information is missing or does not add up.
- examples: 2 good (different from each other) and 1 bad (kind "bad", with a note). Realistic, consistent with the rules, calculations checked, no {{ }} inside.
- format plus formatNote (exact columns, sections or keys). tone optional.
- behaviors: 0 to 3 that fit (grounded, verify, unsure). Never "ask" with json or xml output.
- mode "auto", delim "hash", taskPlacement "after" unless there is a reason.

ALLOWED VALUES
format: "", bluf, bullets, numbered, table, markdown, prose, code, json, xml
length: "", sentences, words, paragraphs (lengthN = number as a string)
behaviors keys: grounded, quotes, decompose, think, verify, unsure, ask, readback (booleans)
mode: auto, simple, structured. delim: hash, quote, none. taskPlacement: after, before.
varDefs.<name>: {"type":"text|long|choice","options":[],"def":""} (max 60)
example: {"kind":"good|bad","input","output","note"}
constraint: {"text","why"}

FILE SHAPE
{"app":"PromptForge","kind":"templates","version":1,"exportedAt":"<ISO time>","templates":[{"name":"(60 chars max)","desc":"(140 max)","use":"(140 max)","data":{role,intent,audience,context:[{tag,text}],task:[{tag,text}],examples:[],constraints:[],success:[],avoid:[],fallback,format,formatNote,length,lengthN,tone,behaviors:{},mode,delim,taskPlacement,varDefs:{}}}]}
Do not use data.name or data.vars (ignored on import). Put defaults in varDefs.<name>.def.

SELF-CHECK BEFORE REPLYING
- Valid JSON: straight quotes, \n for line breaks, no trailing commas, no comments.
- Every {{name}} used has a varDefs entry and vice versa. No stray double braces anywhere, including examples.
- Tags are unique. Choice defaults are in their options.
- Examples add up and obey the rules. 7 rules or fewer, mostly positive, at least one with a why.
- Nothing invented beyond the source, except flagged assumptions.

REPLY FORMAT
1. Two or three sentences: what the template does.
2. Variables: name, type, default.
3. Assumptions: bullets, including any about the output.
4. One ```json block with nothing but the file. Suggested filename: <slug>-template.json.
5. One line: PromptForge > Templates > Import, then open Templates > Yours.
Deliver one template unless asked for more.
````

---

## 12. Testing a generated template

1. Import the file (*Templates → Import*) and open it with **Use template**.
2. Check the variables panel: every field from the source is there, with the right type and default.
3. Fill the variables and read the preview. Switch between Auto, Simple and XML tags.
4. Open **Prompt check**: only "Fill every variable" should be open before you fill anything.
5. Run it on a real example. If a reply has a flaw, add it to the template as a `bad` example and re-save with *More → Save as template*.
6. To keep personal defaults (for example your usual activity), fill the variable, then use *Save as template* with "Keep the variable values I've filled in as defaults" ticked.

*Written against PromptForge V5. If the app's import code changes (storage keys, allowed values, limits), re-check sections 3, 4 and 8.*
