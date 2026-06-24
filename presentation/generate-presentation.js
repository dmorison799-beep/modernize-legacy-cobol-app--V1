'use strict';

const pptxgen = require('pptxgenjs');

function generatePresentation() {
  const pptx = new pptxgen();

  // Presentation metadata
  pptx.author = 'Devin AI';
  pptx.title = 'COBOL to Node.js Modernization';
  pptx.subject = 'Legacy System Migration';

  // Color scheme
  const colors = {
    primary: '1B365D',    // Dark blue
    secondary: '2E86AB',  // Medium blue
    accent: '28A745',     // Green
    warning: 'F5A623',    // Orange
    dark: '2D3748',       // Dark gray
    light: 'F7FAFC',      // Light gray
    white: 'FFFFFF',
    codeBackground: '1E1E1E'
  };

  // ===================== SLIDE 1: Title =====================
  let slide = pptx.addSlide();
  slide.background = { color: colors.primary };
  slide.addText('COBOL to Node.js\nModernization', {
    x: 0.5, y: 1.0, w: 9, h: 2.5,
    fontSize: 40, bold: true, color: colors.white,
    align: 'center', valign: 'middle'
  });
  slide.addText('Legacy Account Management System Migration', {
    x: 0.5, y: 3.5, w: 9, h: 0.8,
    fontSize: 20, color: colors.light,
    align: 'center'
  });
  slide.addText('Powered by Devin AI', {
    x: 0.5, y: 4.8, w: 9, h: 0.5,
    fontSize: 14, color: colors.secondary,
    align: 'center', italic: true
  });

  // ===================== SLIDE 2: Agenda =====================
  slide = pptx.addSlide();
  slide.addText('Agenda', {
    x: 0.5, y: 0.3, w: 9, h: 0.8,
    fontSize: 32, bold: true, color: colors.primary
  });
  const agendaItems = [
    '1. Legacy System Overview',
    '2. Modernization Goals & Drivers',
    '3. Architecture Comparison',
    '4. Code Mapping (COBOL \u2192 JavaScript)',
    '5. Node.js Application Structure',
    '6. Testing Strategy & Results',
    '7. Deployment Architecture',
    '8. Deployment Process & Scripts',
    '9. Migration Verification',
    '10. Benefits & Future Enhancements'
  ];
  slide.addText(agendaItems.join('\n'), {
    x: 1.0, y: 1.3, w: 8, h: 4.2,
    fontSize: 18, color: colors.dark,
    lineSpacingMultiple: 1.5
  });

  // ===================== SLIDE 3: Legacy System Overview =====================
  slide = pptx.addSlide();
  slide.addText('Legacy System Overview', {
    x: 0.5, y: 0.3, w: 9, h: 0.8,
    fontSize: 32, bold: true, color: colors.primary
  });
  slide.addText('COBOL Account Management System', {
    x: 0.5, y: 1.2, w: 9, h: 0.5,
    fontSize: 20, bold: true, color: colors.secondary
  });

  const legacyTable = [
    [{ text: 'Component', options: { bold: true, color: colors.white, fill: { color: colors.primary } } },
     { text: 'File', options: { bold: true, color: colors.white, fill: { color: colors.primary } } },
     { text: 'Purpose', options: { bold: true, color: colors.white, fill: { color: colors.primary } } }],
    [{ text: 'MainProgram' }, { text: 'main.cob' }, { text: 'User interface & menu loop' }],
    [{ text: 'Operations' }, { text: 'operations.cob' }, { text: 'Credit, debit, view balance' }],
    [{ text: 'DataProgram' }, { text: 'data.cob' }, { text: 'Balance read/write storage' }]
  ];
  slide.addTable(legacyTable, {
    x: 0.5, y: 1.9, w: 9, h: 1.8,
    fontSize: 14,
    border: { type: 'solid', pt: 1, color: 'CCCCCC' },
    rowH: [0.45, 0.45, 0.45, 0.45]
  });

  slide.addText('Key Characteristics:', {
    x: 0.5, y: 4.0, w: 9, h: 0.4,
    fontSize: 16, bold: true, color: colors.dark
  });
  slide.addText('\u2022 Fixed-point decimal (PIC 9(6)V99) for financial precision\n\u2022 CALL/GOBACK subprogram architecture\n\u2022 Sequential DISPLAY/ACCEPT for I/O\n\u2022 Initial balance: 1000.00', {
    x: 0.8, y: 4.4, w: 8.5, h: 1.2,
    fontSize: 14, color: colors.dark, lineSpacingMultiple: 1.3
  });

  // ===================== SLIDE 4: Modernization Goals =====================
  slide = pptx.addSlide();
  slide.addText('Modernization Goals', {
    x: 0.5, y: 0.3, w: 9, h: 0.8,
    fontSize: 32, bold: true, color: colors.primary
  });

  const goals = [
    { title: 'Maintainability', desc: 'Modern language with vast ecosystem and developer talent pool' },
    { title: 'Testability', desc: 'Unit and integration tests with automated coverage reporting' },
    { title: 'Deployability', desc: 'Containerized deployment with Docker, CI/CD ready' },
    { title: 'Extensibility', desc: 'Class-based design enabling REST API, database, auth additions' },
    { title: 'Behavioral Parity', desc: 'Exact same business logic - validated against TESTPLAN.md' }
  ];

  goals.forEach((goal, i) => {
    const y = 1.3 + (i * 0.85);
    slide.addText(`\u2713 ${goal.title}`, {
      x: 0.8, y, w: 3, h: 0.4,
      fontSize: 16, bold: true, color: colors.accent
    });
    slide.addText(goal.desc, {
      x: 3.8, y, w: 5.7, h: 0.4,
      fontSize: 14, color: colors.dark
    });
  });

  // ===================== SLIDE 5: Architecture Comparison =====================
  slide = pptx.addSlide();
  slide.addText('Architecture Comparison', {
    x: 0.5, y: 0.3, w: 9, h: 0.8,
    fontSize: 32, bold: true, color: colors.primary
  });

  // COBOL side
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 0.3, y: 1.3, w: 4.2, h: 4.0,
    fill: { color: 'FFF3E0' }, line: { color: colors.warning, width: 2 },
    rectRadius: 0.05
  });
  slide.addText('COBOL Architecture', {
    x: 0.5, y: 1.4, w: 4, h: 0.5,
    fontSize: 16, bold: true, color: colors.warning, align: 'center'
  });
  slide.addText('main.cob\n(MainProgram)\n\u2193 CALL\noperations.cob\n(Operations)\n\u2193 CALL\ndata.cob\n(DataProgram)', {
    x: 0.8, y: 2.0, w: 3.5, h: 3.0,
    fontSize: 14, color: colors.dark, align: 'center',
    lineSpacingMultiple: 1.3
  });

  // Arrow
  slide.addText('\u2192', {
    x: 4.5, y: 2.8, w: 1, h: 1,
    fontSize: 36, color: colors.accent, align: 'center', bold: true
  });

  // Node.js side
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 5.5, y: 1.3, w: 4.2, h: 4.0,
    fill: { color: 'E8F5E9' }, line: { color: colors.accent, width: 2 },
    rectRadius: 0.05
  });
  slide.addText('Node.js Architecture', {
    x: 5.7, y: 1.4, w: 4, h: 0.5,
    fontSize: 16, bold: true, color: colors.accent, align: 'center'
  });
  slide.addText('main.js\n(AccountApp class)\n\u2193 method call\noperations.js\n(Operations class)\n\u2193 method call\ndata.js\n(DataStore class)', {
    x: 6.0, y: 2.0, w: 3.5, h: 3.0,
    fontSize: 14, color: colors.dark, align: 'center',
    lineSpacingMultiple: 1.3
  });

  // ===================== SLIDE 6: Code Mapping =====================
  slide = pptx.addSlide();
  slide.addText('Code Mapping: COBOL \u2192 JavaScript', {
    x: 0.5, y: 0.3, w: 9, h: 0.8,
    fontSize: 28, bold: true, color: colors.primary
  });

  const mappingTable = [
    [{ text: 'COBOL Construct', options: { bold: true, color: colors.white, fill: { color: colors.primary } } },
     { text: 'Node.js Equivalent', options: { bold: true, color: colors.white, fill: { color: colors.primary } } },
     { text: 'Notes', options: { bold: true, color: colors.white, fill: { color: colors.primary } } }],
    [{ text: 'PIC 9(6)V99' }, { text: 'number + toFixed(2)' }, { text: '64-bit float' }],
    [{ text: 'PERFORM UNTIL' }, { text: 'while (flag)' }, { text: 'Loop control' }],
    [{ text: 'EVALUATE/WHEN' }, { text: 'switch/case' }, { text: 'Menu routing' }],
    [{ text: 'CALL ... USING' }, { text: 'class.method()' }, { text: 'DI pattern' }],
    [{ text: 'DISPLAY' }, { text: 'output.write()' }, { text: 'Stream-based' }],
    [{ text: 'ACCEPT' }, { text: 'readline.question()' }, { text: 'Async I/O' }],
    [{ text: 'WORKING-STORAGE' }, { text: 'constructor()' }, { text: 'Instance state' }],
    [{ text: 'GOBACK' }, { text: 'return { ... }' }, { text: 'Result objects' }]
  ];
  slide.addTable(mappingTable, {
    x: 0.3, y: 1.2, w: 9.4, h: 4.0,
    fontSize: 12,
    border: { type: 'solid', pt: 1, color: 'CCCCCC' },
    rowH: [0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4]
  });

  // ===================== SLIDE 7: Node.js Application Structure =====================
  slide = pptx.addSlide();
  slide.addText('Node.js Application Structure', {
    x: 0.5, y: 0.3, w: 9, h: 0.8,
    fontSize: 32, bold: true, color: colors.primary
  });

  const structure = `node-app/
\u251C\u2500\u2500 src/
\u2502   \u251C\u2500\u2500 main.js          # AccountApp class (CLI loop)
\u2502   \u251C\u2500\u2500 operations.js    # Operations class (business logic)
\u2502   \u2514\u2500\u2500 data.js          # DataStore class (persistence)
\u251C\u2500\u2500 tests/
\u2502   \u251C\u2500\u2500 unit/
\u2502   \u2502   \u251C\u2500\u2500 data.test.js
\u2502   \u2502   \u2514\u2500\u2500 operations.test.js
\u2502   \u2514\u2500\u2500 integration/
\u2502       \u2514\u2500\u2500 accounting.test.js
\u251C\u2500\u2500 package.json
\u2514\u2500\u2500 .eslintrc.json`;

  slide.addShape(pptx.ShapeType.roundRect, {
    x: 0.5, y: 1.2, w: 5.5, h: 4.3,
    fill: { color: colors.codeBackground },
    rectRadius: 0.05
  });
  slide.addText(structure, {
    x: 0.8, y: 1.4, w: 5, h: 4.0,
    fontSize: 11, fontFace: 'Courier New', color: colors.light,
    lineSpacingMultiple: 1.2
  });

  // Key points
  slide.addText('Design Principles:', {
    x: 6.2, y: 1.3, w: 3.5, h: 0.4,
    fontSize: 14, bold: true, color: colors.dark
  });
  slide.addText('\u2022 Dependency injection\n\u2022 Single responsibility\n\u2022 Testable modules\n\u2022 No external runtime deps\n\u2022 Stream-based I/O\n\u2022 Async/await patterns', {
    x: 6.2, y: 1.8, w: 3.5, h: 2.5,
    fontSize: 13, color: colors.dark, lineSpacingMultiple: 1.5
  });

  // ===================== SLIDE 8: Testing Strategy =====================
  slide = pptx.addSlide();
  slide.addText('Testing Strategy', {
    x: 0.5, y: 0.3, w: 9, h: 0.8,
    fontSize: 32, bold: true, color: colors.primary
  });

  slide.addText('Framework: Jest | Coverage: 85%+ | Test Cases: 31', {
    x: 0.5, y: 1.1, w: 9, h: 0.5,
    fontSize: 16, color: colors.secondary, italic: true
  });

  const testTable = [
    [{ text: 'Test ID', options: { bold: true, color: colors.white, fill: { color: colors.primary } } },
     { text: 'Description', options: { bold: true, color: colors.white, fill: { color: colors.primary } } },
     { text: 'Type', options: { bold: true, color: colors.white, fill: { color: colors.primary } } },
     { text: 'Status', options: { bold: true, color: colors.white, fill: { color: colors.primary } } }],
    [{ text: 'TC-1.1' }, { text: 'View current balance' }, { text: 'Unit' }, { text: '\u2713 PASS', options: { color: colors.accent, bold: true } }],
    [{ text: 'TC-2.1' }, { text: 'Credit with valid amount' }, { text: 'Unit' }, { text: '\u2713 PASS', options: { color: colors.accent, bold: true } }],
    [{ text: 'TC-2.2' }, { text: 'Credit with zero amount' }, { text: 'Unit' }, { text: '\u2713 PASS', options: { color: colors.accent, bold: true } }],
    [{ text: 'TC-3.1' }, { text: 'Debit with valid amount' }, { text: 'Unit' }, { text: '\u2713 PASS', options: { color: colors.accent, bold: true } }],
    [{ text: 'TC-3.2' }, { text: 'Debit exceeding balance' }, { text: 'Unit' }, { text: '\u2713 PASS', options: { color: colors.accent, bold: true } }],
    [{ text: 'TC-3.3' }, { text: 'Debit with zero amount' }, { text: 'Unit' }, { text: '\u2713 PASS', options: { color: colors.accent, bold: true } }],
    [{ text: 'TC-4.1' }, { text: 'Exit application' }, { text: 'Integration' }, { text: '\u2713 PASS', options: { color: colors.accent, bold: true } }]
  ];
  slide.addTable(testTable, {
    x: 0.3, y: 1.7, w: 9.4, h: 3.6,
    fontSize: 12,
    border: { type: 'solid', pt: 1, color: 'CCCCCC' },
    rowH: [0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4]
  });

  // ===================== SLIDE 9: Test Results =====================
  slide = pptx.addSlide();
  slide.addText('Test Results Summary', {
    x: 0.5, y: 0.3, w: 9, h: 0.8,
    fontSize: 32, bold: true, color: colors.primary
  });

  // Results boxes
  const results = [
    { label: 'Test Suites', value: '3 passed', color: colors.accent },
    { label: 'Total Tests', value: '31 passed', color: colors.accent },
    { label: 'Coverage', value: '85%+', color: colors.secondary },
    { label: 'Time', value: '< 1 second', color: colors.dark }
  ];

  results.forEach((r, i) => {
    const x = 0.5 + (i * 2.4);
    slide.addShape(pptx.ShapeType.roundRect, {
      x, y: 1.3, w: 2.2, h: 1.5,
      fill: { color: colors.light },
      line: { color: r.color, width: 2 },
      rectRadius: 0.05
    });
    slide.addText(r.value, {
      x, y: 1.5, w: 2.2, h: 0.8,
      fontSize: 16, bold: true, color: r.color, align: 'center'
    });
    slide.addText(r.label, {
      x, y: 2.2, w: 2.2, h: 0.5,
      fontSize: 12, color: colors.dark, align: 'center'
    });
  });

  // Coverage breakdown
  const coverageTable = [
    [{ text: 'File', options: { bold: true, color: colors.white, fill: { color: colors.primary } } },
     { text: 'Statements', options: { bold: true, color: colors.white, fill: { color: colors.primary } } },
     { text: 'Branches', options: { bold: true, color: colors.white, fill: { color: colors.primary } } },
     { text: 'Functions', options: { bold: true, color: colors.white, fill: { color: colors.primary } } },
     { text: 'Lines', options: { bold: true, color: colors.white, fill: { color: colors.primary } } }],
    [{ text: 'data.js' }, { text: '100%' }, { text: '100%' }, { text: '100%' }, { text: '100%' }],
    [{ text: 'operations.js' }, { text: '100%' }, { text: '100%' }, { text: '100%' }, { text: '100%' }],
    [{ text: 'main.js' }, { text: '77%' }, { text: '44%' }, { text: '100%' }, { text: '77%' }]
  ];
  slide.addTable(coverageTable, {
    x: 0.5, y: 3.2, w: 9, h: 2.0,
    fontSize: 13,
    border: { type: 'solid', pt: 1, color: 'CCCCCC' },
    rowH: [0.4, 0.4, 0.4, 0.4]
  });

  // ===================== SLIDE 10: Deployment Architecture =====================
  slide = pptx.addSlide();
  slide.addText('Deployment Architecture', {
    x: 0.5, y: 0.3, w: 9, h: 0.8,
    fontSize: 32, bold: true, color: colors.primary
  });

  // Deployment options
  const deployOptions = [
    { title: 'Docker', items: 'Multi-stage build\nAlpine-based image\nNon-root user\nHealth checks\nRestart policies' },
    { title: 'PM2', items: 'Process management\nAuto-restart\nLog rotation\nMemory limits\nCluster mode' },
    { title: 'AWS', items: 'ECS/Fargate\nElastic Beanstalk\nEC2 with PM2\nECR registry\nAuto-scaling' }
  ];

  deployOptions.forEach((opt, i) => {
    const x = 0.5 + (i * 3.2);
    slide.addShape(pptx.ShapeType.roundRect, {
      x, y: 1.2, w: 3.0, h: 4.0,
      fill: { color: colors.light },
      line: { color: colors.secondary, width: 1 },
      rectRadius: 0.05
    });
    slide.addText(opt.title, {
      x, y: 1.3, w: 3.0, h: 0.6,
      fontSize: 18, bold: true, color: colors.primary, align: 'center'
    });
    slide.addText(opt.items, {
      x: x + 0.3, y: 2.0, w: 2.5, h: 3.0,
      fontSize: 13, color: colors.dark, lineSpacingMultiple: 1.5
    });
  });

  // ===================== SLIDE 11: Deployment Process =====================
  slide = pptx.addSlide();
  slide.addText('Deployment Process', {
    x: 0.5, y: 0.3, w: 9, h: 0.8,
    fontSize: 32, bold: true, color: colors.primary
  });

  slide.addText('deploy.sh - Automated Deployment Script', {
    x: 0.5, y: 1.1, w: 9, h: 0.5,
    fontSize: 16, color: colors.secondary, italic: true
  });

  const steps = [
    { step: '1', title: 'Build Image', desc: 'Multi-stage Docker build with version tagging' },
    { step: '2', title: 'Push Registry', desc: 'Optional push to ECR/DockerHub' },
    { step: '3', title: 'Stop Previous', desc: 'Preserve old container for rollback' },
    { step: '4', title: 'Start New', desc: 'Launch with restart policies and env vars' },
    { step: '5', title: 'Health Check', desc: 'Verify container running (5 retries)' },
    { step: '6', title: 'Cleanup', desc: 'Remove backup or auto-rollback on failure' }
  ];

  steps.forEach((s, i) => {
    const y = 1.7 + (i * 0.7);
    slide.addShape(pptx.ShapeType.ellipse, {
      x: 0.7, y: y + 0.05, w: 0.5, h: 0.5,
      fill: { color: colors.primary }
    });
    slide.addText(s.step, {
      x: 0.7, y: y + 0.05, w: 0.5, h: 0.5,
      fontSize: 14, bold: true, color: colors.white, align: 'center', valign: 'middle'
    });
    slide.addText(s.title, {
      x: 1.5, y, w: 2.5, h: 0.5,
      fontSize: 15, bold: true, color: colors.dark
    });
    slide.addText(s.desc, {
      x: 4.0, y, w: 5.5, h: 0.5,
      fontSize: 13, color: colors.dark
    });
  });

  // ===================== SLIDE 12: Migration Verification =====================
  slide = pptx.addSlide();
  slide.addText('Migration Verification', {
    x: 0.5, y: 0.3, w: 9, h: 0.8,
    fontSize: 32, bold: true, color: colors.primary
  });

  slide.addText('All COBOL behaviors preserved and validated via TESTPLAN.md', {
    x: 0.5, y: 1.1, w: 9, h: 0.5,
    fontSize: 16, color: colors.secondary, italic: true
  });

  const verificationTable = [
    [{ text: 'COBOL Behavior', options: { bold: true, color: colors.white, fill: { color: colors.primary } } },
     { text: 'Node.js Implementation', options: { bold: true, color: colors.white, fill: { color: colors.primary } } },
     { text: 'Verified', options: { bold: true, color: colors.white, fill: { color: colors.primary } } }],
    [{ text: 'Initial balance 1000.00' }, { text: 'DataStore(1000.00)' }, { text: '\u2713', options: { color: colors.accent, bold: true } }],
    [{ text: 'View displays balance' }, { text: 'viewBalance() returns formatted string' }, { text: '\u2713', options: { color: colors.accent, bold: true } }],
    [{ text: 'Credit adds to balance' }, { text: 'credit() updates DataStore' }, { text: '\u2713', options: { color: colors.accent, bold: true } }],
    [{ text: 'Debit subtracts from balance' }, { text: 'debit() with sufficient funds check' }, { text: '\u2713', options: { color: colors.accent, bold: true } }],
    [{ text: 'Insufficient funds rejection' }, { text: 'Returns success:false with message' }, { text: '\u2713', options: { color: colors.accent, bold: true } }],
    [{ text: 'Menu-driven CLI interface' }, { text: 'readline with async/await loop' }, { text: '\u2713', options: { color: colors.accent, bold: true } }],
    [{ text: 'Exit terminates program' }, { text: 'running=false, rl.close()' }, { text: '\u2713', options: { color: colors.accent, bold: true } }]
  ];
  slide.addTable(verificationTable, {
    x: 0.3, y: 1.7, w: 9.4, h: 3.6,
    fontSize: 12,
    border: { type: 'solid', pt: 1, color: 'CCCCCC' },
    rowH: [0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4]
  });

  // ===================== SLIDE 13: Key Benefits =====================
  slide = pptx.addSlide();
  slide.addText('Key Benefits', {
    x: 0.5, y: 0.3, w: 9, h: 0.8,
    fontSize: 32, bold: true, color: colors.primary
  });

  const benefits = [
    { icon: '\u26A1', title: 'Performance', desc: 'Non-blocking I/O, V8 JIT compilation, sub-second test execution' },
    { icon: '\uD83D\uDEE0\uFE0F', title: 'Maintainability', desc: 'Modern JS syntax, class-based design, rich tooling ecosystem' },
    { icon: '\uD83E\uDDEA', title: 'Testability', desc: '31 automated tests, 85%+ coverage, CI/CD ready' },
    { icon: '\uD83D\uDE80', title: 'Deployability', desc: 'Docker containers, PM2, cloud-native, one-command deploy' },
    { icon: '\uD83D\uDC65', title: 'Talent Pool', desc: 'Millions of JavaScript developers vs. declining COBOL expertise' },
    { icon: '\uD83D\uDD17', title: 'Extensibility', desc: 'Easy to add REST API, database, authentication, microservices' }
  ];

  benefits.forEach((b, i) => {
    const y = 1.2 + (i * 0.75);
    slide.addText(b.icon, {
      x: 0.5, y, w: 0.6, h: 0.6,
      fontSize: 20, align: 'center'
    });
    slide.addText(b.title, {
      x: 1.2, y, w: 2.5, h: 0.6,
      fontSize: 16, bold: true, color: colors.dark, valign: 'middle'
    });
    slide.addText(b.desc, {
      x: 3.5, y, w: 6.2, h: 0.6,
      fontSize: 13, color: colors.dark, valign: 'middle'
    });
  });

  // ===================== SLIDE 14: Future Enhancements =====================
  slide = pptx.addSlide();
  slide.addText('Future Enhancements', {
    x: 0.5, y: 0.3, w: 9, h: 0.8,
    fontSize: 32, bold: true, color: colors.primary
  });

  const enhancements = [
    { phase: 'Phase 2', title: 'REST API', desc: 'Express.js HTTP layer for web/mobile access', effort: 'Medium' },
    { phase: 'Phase 3', title: 'Database', desc: 'PostgreSQL/MongoDB replacing in-memory store', effort: 'Medium' },
    { phase: 'Phase 4', title: 'Authentication', desc: 'JWT tokens, user accounts, role-based access', effort: 'High' },
    { phase: 'Phase 5', title: 'Transaction History', desc: 'Audit log with timestamps for all operations', effort: 'Low' },
    { phase: 'Phase 6', title: 'Multi-Currency', desc: 'Support multiple account currencies with exchange', effort: 'High' }
  ];

  const enhTable = [
    [{ text: 'Phase', options: { bold: true, color: colors.white, fill: { color: colors.primary } } },
     { text: 'Enhancement', options: { bold: true, color: colors.white, fill: { color: colors.primary } } },
     { text: 'Description', options: { bold: true, color: colors.white, fill: { color: colors.primary } } },
     { text: 'Effort', options: { bold: true, color: colors.white, fill: { color: colors.primary } } }],
    ...enhancements.map(e => [{ text: e.phase }, { text: e.title }, { text: e.desc }, { text: e.effort }])
  ];

  slide.addTable(enhTable, {
    x: 0.3, y: 1.2, w: 9.4, h: 2.8,
    fontSize: 13,
    border: { type: 'solid', pt: 1, color: 'CCCCCC' },
    rowH: [0.4, 0.45, 0.45, 0.45, 0.45, 0.45]
  });

  slide.addText('Recommended Roadmap', {
    x: 0.5, y: 4.2, w: 9, h: 0.4,
    fontSize: 16, bold: true, color: colors.dark
  });
  slide.addText('REST API \u2192 Database \u2192 Auth \u2192 History \u2192 Multi-Currency', {
    x: 0.5, y: 4.6, w: 9, h: 0.4,
    fontSize: 14, color: colors.secondary, align: 'center'
  });

  // ===================== SLIDE 15: Q&A =====================
  slide = pptx.addSlide();
  slide.background = { color: colors.primary };
  slide.addText('Questions & Discussion', {
    x: 0.5, y: 1.5, w: 9, h: 1.5,
    fontSize: 40, bold: true, color: colors.white, align: 'center'
  });
  slide.addText('Thank you for attending!', {
    x: 0.5, y: 3.2, w: 9, h: 0.8,
    fontSize: 20, color: colors.light, align: 'center'
  });
  slide.addText('Resources:\n\u2022 docs/README.md - Quick start guide\n\u2022 docs/API.md - Full API reference\n\u2022 docs/DEPLOYMENT.md - Deployment guide\n\u2022 TESTPLAN.md - Test cases & validation', {
    x: 2, y: 4.0, w: 6, h: 1.5,
    fontSize: 14, color: colors.light, lineSpacingMultiple: 1.4
  });

  // Save
  const outputPath = './COBOL-to-NodeJS-Modernization.pptx';
  pptx.writeFile({ fileName: outputPath })
    .then(() => {
      console.log(`Presentation generated: ${outputPath}`);
      console.log(`Slides: ${pptx.slides.length}`);
    })
    .catch(err => {
      console.error('Error generating presentation:', err);
      process.exit(1);
    });
}

generatePresentation();
