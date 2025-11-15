const traits = {
    oral: 20,
    esquizoide: 20,
    masoquista: 20,
    psicopatia: 20,
    rigido: 20,
};

const sliders = {
    oral: document.getElementById("oral-slider"),
    esquizoide: document.getElementById("esquizoide-slider"),
    masoquista: document.getElementById("masoquista-slider"),
    psicopatia: document.getElementById("psicopatia-slider"),
    rigido: document.getElementById("rigido-slider"),
};

const percents = {
    oral: document.getElementById("oral-percent"),
    esquizoide: document.getElementById("esquizoide-percent"),
    masoquista: document.getElementById("masoquista-percent"),
    psicopatia: document.getElementById("psicopatia-percent"),
    rigido: document.getElementById("rigido-percent"),
};

const profileSummary = document.getElementById("profile-summary");
const bodyRoot = document.getElementById("character-body");

const quizLengthSelect = document.getElementById("quiz-length");
const quizStartButton = document.getElementById("btn-start-quiz");
const quizArea = document.getElementById("quiz-area");
const quizProgress = document.getElementById("quiz-progress");
const quizTraitLabel = document.getElementById("quiz-trait-label");
const quizQuestionText = document.getElementById("quiz-question-text");
const quizOptions = document.getElementById("quiz-options");
const quizResultText = document.getElementById("quiz-result-text");

// Mapa de rótulos legíveis para cada traço
const TRAIT_LABELS = {
    oral: "Oral",
    esquizoide: "Esquizoide",
    masoquista: "Masoquista",
    psicopatia: "Psicopatia",
    rigido: "Rígido",
};

const TRAITS_KEYS = Object.keys(TRAIT_LABELS);



function normalizeTraits() {
    const sum =
        traits.oral +
        traits.esquizoide +
        traits.masoquista +
        traits.psicopatia +
        traits.rigido;

    if (sum <= 0) {
        traits.oral =
            traits.esquizoide =
            traits.masoquista =
            traits.psicopatia =
            traits.rigido =
                20;
        return;
    }

    const factor = 100 / sum;

    traits.oral *= factor;
    traits.esquizoide *= factor;
    traits.masoquista *= factor;
    traits.psicopatia *= factor;
    traits.rigido *= factor;
}

function updateFromSliders() {
    traits.oral = parseFloat(sliders.oral.value);
    traits.esquizoide = parseFloat(sliders.esquizoide.value);
    traits.masoquista = parseFloat(sliders.masoquista.value);
    traits.psicopatia = parseFloat(sliders.psicopatia.value);
    traits.rigido = parseFloat(sliders.rigido.value);

    normalizeTraits();
    applyTraitsToUI();
    applyTraitsToBody();
}

function applyTraitsToUI() {
    sliders.oral.value = traits.oral;
    sliders.esquizoide.value = traits.esquizoide;
    sliders.masoquista.value = traits.masoquista;
    sliders.psicopatia.value = traits.psicopatia;
    sliders.rigido.value = traits.rigido;

    percents.oral.textContent = `${traits.oral.toFixed(0)}%`;
    percents.esquizoide.textContent = `${traits.esquizoide.toFixed(0)}%`;
    percents.masoquista.textContent = `${traits.masoquista.toFixed(0)}%`;
    percents.psicopatia.textContent = `${traits.psicopatia.toFixed(0)}%`;
    percents.rigido.textContent = `${traits.rigido.toFixed(0)}%`;

    profileSummary.textContent =
        `Perfil geral: ` +
        `${traits.oral.toFixed(0)}% Oral / ` +
        `${traits.esquizoide.toFixed(0)}% Esquizoide / ` +
        `${traits.masoquista.toFixed(0)}% Masoquista / ` +
        `${traits.psicopatia.toFixed(0)}% Psicopatia / ` +
        `${traits.rigido.toFixed(0)}% Rígido`;
}

function clamp(v, min, max) {
    return Math.max(min, Math.min(max, v));
}


/**
 * MAPA EMOCIONAL DOS TRAÇOS NO CORPO (arte emocional do avatar)
 *
 * - Oral: tronco e barriga mais arredondados, quadril discreto.
 *         Representa busca de acolhimento, prazer, contato e “nutrição” afetiva.
 *
 * - Esquizoide: corpo alto, estreito, com ombros retraídos.
 *               Simboliza retraimento, proteção do mundo interno e foco no pensamento.
 *
 * - Masoquista: tronco blocado e pesado, braços mais grossos, base firme.
 *               Expressa emoção contida, tendência a suportar carga e engolir frustrações.
 *
 * - Psicopatia: ombros largos, peito em V, cabeça mais triangular.
 *               Simboliza comando, controle, sedução e liderança do cenário.
 *
 * - Rígido: proporções equilibradas, cintura afinada e quadril sustentado (“violão”).
 *           Traduz desejo de performance, estética, perfeccionismo e medo de rejeição/troca.
 */

function applyTraitsToBody() {
    if (!bodyRoot) return;

    const torso = bodyRoot.querySelector(".body-torso");
    const hips = bodyRoot.querySelector(".body-hips");
    const legs = bodyRoot.querySelectorAll(".leg");
    const abs = bodyRoot.querySelector(".torso-abs");
    const belly = bodyRoot.querySelector(".torso-belly");
    const upper = bodyRoot.querySelector(".body-upper");
    const neck = bodyRoot.querySelector(".body-neck");
    const head = bodyRoot.querySelector(".body-head");
    const arms = bodyRoot.querySelectorAll(".body-arm");
    const armMuscles = bodyRoot.querySelectorAll(".arm-muscle");
    const elbows = bodyRoot.querySelectorAll(".joint-elbow");
    const knees = bodyRoot.querySelectorAll(".joint-knee");

    const o = traits.oral / 100;
    const e = traits.esquizoide / 100;
    const m = traits.masoquista / 100;
    const p = traits.psicopatia / 100;
    const r = traits.rigido / 100;

    const dom = dominantTraitKey();
    const baseTorsoHeight = 150;
    const baseTorsoWidth = 84;
    const baseHipWidth = 94;
    const baseLegHeight = 90;
    const baseLegWidth = 20;
    const baseUpperWidth = 140;
    const baseNeckHeight = 10;
    const baseArmWidth = 20;
    const baseArmHeight = 120;

    const baseHeadWidth = 80;
    const baseHeadHeight = 80;


    // Altura geral: esquizoide/rígido alongam; oral/maso compactam levemente
    const heightFactor =
        1 +
        e * 0.55 +
        r * 0.18 +
        o * 0.08 -  // Oral adiciona leve sensação de alongamento
        m * 0.05;

    const torsoHeight = clamp(baseTorsoHeight * heightFactor, 120, 230);

    // Parte superior (peito e ombros)
    const torsoUpperWidthFactor =
        1 +
        p * 1.3 +   // Psicopatia gera V agressivo
        r * 0.2 +   // Rígido amplia ombro de forma discreta
        m * 1.8 +   // Masoquista engrossa o tronco superior
        o * 2.4 -   // Oral expande, porém mais macio
        e * 0.9;    // Esquizoide mantem perfil estreito

    // Parte inferior (barriga/base do tronco)
    const torsoLowerWidthFactor =
        1 +
        o * 3.0 +    // Oral prioriza barriga volumosa
        m * 2.0 -    // Masoquista aumenta base pesada
        p * 0.4 -    // Psicopatia afina o tronco inferior
        e * 0.8 +    // Esquizoide mantém silhueta fina
        r * 1.6;     // Rígido reforça sustentação no quadril


    const torsoWidthTop = clamp(baseTorsoWidth * torsoUpperWidthFactor, 70, 320);
    const torsoWidthBottom = clamp(baseTorsoWidth * torsoLowerWidthFactor, 60, 380);
    const torsoWidth = (torsoWidthTop + torsoWidthBottom) / 2;

    // Quadril equilibrado: oral quase neutro, rígido expande sustentação
    const hipFactor =
        1 +
        m * -0.6 +   // Masoquista reduz quadril
        o * 0.1 -    // Oral altera pouco
        p * 0.5 -    // Psicopatia tira volume
        e * 0.3 +    // Esquizoide realça a finura
        r * 0.9;     // Rígido cria “violão”

    const hipWidth = clamp(baseHipWidth * hipFactor, 60, 230);


    const vShapeRaw =
        p * 1.5 +   // Psicopatia gera V acentuado
        r * 0.9 +   // Rígido mantém V estruturado
        m * 0.8 +   // Masoquista adiciona massa aos ombros
        o * 0.8 +
        e * 0.35;

    const upperWidth = clamp(baseUpperWidth * (1 + vShapeRaw), 130, 290);

    const legHeight = clamp(
        baseLegHeight * (1 + e * 0.35 - m * 0.15 - o * 0.1),
        70,
        140
    );

    const legWidthFactor = 1 + o * 1.3 + m * 1.0 + r * 1.2 - e * 0.2 - p * 0.25;
    const legWidth = clamp(baseLegWidth * legWidthFactor, 20, 52);

    // Pescoço: esquizoide alonga, enquanto traços pesados encurtam
    const neckHeight = clamp(
        baseNeckHeight * (1 - m * 0.4 + e * 2.4 + r * 0.2 - o * 0.1),
        4,
        36
    );

    // Braços: psico/rígido definem, oral deixa macio, masoquista blocado, esquizoide alonga
    const armWidth = clamp(
        baseArmWidth * (1 + p * 0.3 + r * 1.2 + o * 1.8 + m * 2.4 - e * 0.25),
        18,
        75
    );
    const armHeight = clamp(
        baseArmHeight * (1 + e * 0.9 - o * 0.05 - m * 0.05),
        90,
        190
    );

    // Definição muscular: rígido domina, psico ajuda e oral suaviza
    const absIntensity = clamp(
        (r * 1.6 + p * 0.6 + m * 0.2) - (o * 1.4 + m * 0.2),
        0,
        1
    );

    const bellyIntensity = clamp(
        o * 1.6 +   // Oral enfatiza barriga macia
        m * 0.9 -   // Masoquista adiciona peso compacto
        r * 0.8 -   // Rígido seca cintura para estabilidade
        p * 0.3 -
        e * 0.3,
        0,
        1
    );

    const armMuscleIntensity = clamp(
        r * 1.5 +    // Rígido define musculatura dos braços
        p * 1.0 +    // Psico adiciona força seca
        m * 1.4 -    // Masoquista aumenta volume pesado
        o * 0.9,
        0,
        1
    );

    if (torso) {
        torso.style.height = `${torsoHeight}px`;
        torso.style.width = `${torsoWidth}px`;

        // Raio básico: Oral arredonda, Masoquista quadrangular, Esquizoide/Rígido limpam as linhas
        const radius = clamp(
            110 +
            o * 140 -     // Oral cria tronco bolha
            e * 10 -      // Esquizoide achata as curvas
            r * 15 -      // Rígido deixa superfícies limpas
            m * 140,      // Masoquista puxa para formato bloco
            20,
            260
        );
        torso.style.borderRadius = `${radius}px`;

        const triP = clamp(p, 0, 1);
        const waistR = clamp(r, 0, 1);

        if (dom === "psicopatia" && triP > 0.05) {
            // Tronco em V clássico (ombro largo, base estreita)
            const bottomInset = 15 + triP * 24;
            torso.style.clipPath =
                `polygon(
                    0% 0%,
                    100% 0%,
                    ${100 - bottomInset}% 100%,
                    ${bottomInset}% 100%
                )`;
        } else if (dom === "rigido" && waistR > 0.05) {
            // Tronco “violão”: ombros/quadril largos, cintura marcada
            const topInset = 8;                 // chanfro leve nos ombros
            const bottomInset = 8;              // quadril largo e estável
            const waistInset = 26 + waistR*6;   // Rígido define o quanto a cintura afunda

            const midLeft  = waistInset;
            const midRight = 100 - waistInset;

            torso.style.clipPath =
                `polygon(
                    ${topInset}% 0%,
                    ${100 - topInset}% 0%,
                    ${midRight}% 45%,
                    ${100 - bottomInset}% 100%,
                    ${bottomInset}% 100%,
                    ${midLeft}% 45%
                )`;
        } else {
            torso.style.clipPath = "none";
        }
    }


    if (upper) {
        upper.style.width = `${upperWidth}px`;
    }

    if (hips) {
        hips.style.width = `${hipWidth}px`;
    }

    legs.forEach((leg) => {
        leg.style.height = `${legHeight}px`;
        leg.style.width = `${legWidth}px`;
    });

    if (neck) {
        neck.style.height = `${neckHeight}px`;
    }

    arms.forEach((arm) => {
        arm.style.width = `${armWidth}px`;
        arm.style.height = `${armHeight}px`;
    });

    if (abs) {
        const absScale = 0.7 + absIntensity * 0.9;
        abs.style.opacity = 0.1 + absIntensity * 0.9;
        abs.style.transform = `translateX(-50%) scale(${absScale})`;
    }

    if (belly) {
        belly.style.opacity = 0.25 + bellyIntensity * 0.75;
        const bellyScale = 1 + bellyIntensity * 0.6;
        belly.style.transform = `translateX(-50%) scale(${bellyScale}, ${1 + bellyIntensity * 0.4})`;
    }

    armMuscles.forEach((am) => {
        am.style.opacity = 0.28 + armMuscleIntensity * 0.72;
    });

    // Cotovelos e joelhos: esquizoide deixa pontudo, masoquista engrossa
    const elbowBaseW = armWidth * 0.6;
    const elbowBaseH = 22;
    const kneeBaseW = legWidth * 0.7;
    const kneeBaseH = 24;

    const pointinessEsq = e;
    const thicknessMaso = m;

    const elbowWidth = clamp(
        elbowBaseW * (1 + thicknessMaso * 0.6 - pointinessEsq * 0.4),
        10,
        60
    );
    const elbowHeight = clamp(
        elbowBaseH * (1 + thicknessMaso * 0.7 - pointinessEsq * 0.5),
        10,
        40
    );
    const elbowRadius = clamp(
        999 - pointinessEsq * 700 + thicknessMaso * 200,
        80,
        999
    );

    const kneeWidth = clamp(
        kneeBaseW * (1 + thicknessMaso * 0.7 - pointinessEsq * 0.4),
        12,
        70
    );
    const kneeHeight = clamp(
        kneeBaseH * (1 + thicknessMaso * 0.7 - pointinessEsq * 0.5),
        12,
        42
    );
    const kneeRadius = clamp(
        999 - pointinessEsq * 700 + thicknessMaso * 200,
        80,
        999
    );

    elbows.forEach((el) => {
        el.style.width = `${elbowWidth}px`;
        el.style.height = `${elbowHeight}px`;
        el.style.borderRadius = `${elbowRadius}px`;
    });

    knees.forEach((k) => {
        k.style.width = `${kneeWidth}px`;
        k.style.height = `${kneeHeight}px`;
        k.style.borderRadius = `${kneeRadius}px`;
    });

    // Postura geral
    const postureTilt =
        (traits.psicopatia - traits.esquizoide) * 0.14 +
        o * -2 +
        m * -1;

    const lean = clamp(postureTilt, -14, 14);
    bodyRoot.style.transform = `translateY(6px) rotate(${lean}deg)`;

    // Ombros e braços
    const armForwardEsq = e * 12 + m * 16;
    const armDownOral = o * 14;

    const leftArmAngle =
        -4 +
        (-armDownOral * 0.5) +
        (-armForwardEsq * 0.3) +
        (p * 6);

    const rightArmAngle =
        4 +
        (armDownOral * 0.5) +
        (armForwardEsq * 0.3) -
        (p * 6);

    const armLeft = bodyRoot.querySelector(".body-arm-left");
    const armRight = bodyRoot.querySelector(".body-arm-right");

    if (armLeft) {
        armLeft.style.transform = `rotate(${clamp(leftArmAngle, -40, 40)}deg)`;
    }
    if (armRight) {
        armRight.style.transform = `rotate(${clamp(rightArmAngle, -40, 40)}deg)`;
    }

    // Cabeça: esquizoide alonga, rígido busca proporção com o resto do corpo
    const headTilt =
        (-p * 8) +
        (e * 10) +
        (m * 4) +
        (-r * 0.01) +
        (-o * 1);

    // Altura da cabeça: neutra no rígido; esquizoide distorce mais
    const headHeightFactor =
        1 +
        e * 0.6 -    // Esquizoide puxa para cima
        o * 0.05 -
        m * 0.05;

    // Largura acompanha discretamente o rígido para evitar desproporção
    const headWidthFactor =
        1 -
        e * 0.25 +   // Esquizoide afina na horizontal
        m * 0.05 +
        o * 0.05 +
        r * 0.01;    // Rígido dá leve reforço para equilibrar com o tronco

    const headHeightPx = clamp(baseHeadHeight * headHeightFactor, 10, 120);
    const headWidthPx  = clamp(baseHeadWidth  * headWidthFactor, 15, 115);

    if (head) {
        head.style.width = `${headWidthPx}px`;
        head.style.height = `${headHeightPx}px`;
        head.style.transform =
            `rotate(${clamp(headTilt, -15, 15)}deg)`;
    }


    applyFacialExpression();
}

function dominantTraitKey() {
    let max = -Infinity;
    let key = "oral";
    for (const k of Object.keys(traits)) {
        if (traits[k] > max) {
            max = traits[k];
            key = k;
        }
    }
    return key;
}

function applyFacialExpression() {
    const head = bodyRoot.querySelector(".body-head");
    const mouth = bodyRoot.querySelector(".mouth");
    const eyes = bodyRoot.querySelectorAll(".eye");

    if (!head || !mouth || !eyes.length) return;

    const dom = dominantTraitKey();

    // Boca (valores padrão)
    let mouthHeight = 6;
    let mouthWidth = 22;
    let mouthBorderRadius = 999;
    let mouthRotate = 0;
    let mouthOffsetY = 5;

    // Olhos (valores padrão)
    let eyeScaleX = 1;
    let eyeScaleY = 1;
    let eyeOffsetY = 0;
    let eyeGlowRadius = 2.0;
    let eyeShadow = "rgba(15, 23, 42, 0.6)";
    let eyeBg = "#0f172a";

    // Deformação individual por olho (inclinação e deslocamento independente)
    let leftEyeSkewY = 0;          // Inclinação vertical olho esquerdo
    let rightEyeSkewY = 0;         // Inclinação vertical olho direito
    let leftEyeExtraOffsetY = 0;   // Offset extra em Y (olho esquerdo)
    let rightEyeExtraOffsetY = 0;  // Offset extra em Y (olho direito)

    // Cabeça (base)
    let headShadow = "0 6px 18px rgba(15, 23, 42, 0.9)";
    let headBorderRadius = "50%";
    let headClipPath = "none";

    // Reset visual da boca
    mouth.style.background = "#0f172a";
    mouth.style.borderTop = "0";
    mouth.style.borderBottom = "0";

    if (dom === "oral") {
        // Oral: rosto arredondado e sorriso em U suave
        mouthHeight = 12;
        mouthWidth = 32;
        mouthBorderRadius = 999;
        mouthRotate = 0;
        mouthOffsetY = 6;

        eyeScaleX = 1.2;
        eyeScaleY = 1.2;
        eyeOffsetY = 0;
        eyeGlowRadius = 3;
        eyeShadow = "rgba(15, 23, 42, 0.4)";
        headShadow = "0 6px 18px rgba(15, 23, 42, 0.9)";
        headBorderRadius = "50%";
        headClipPath = "none";

        // Boca em U (apenas borda inferior visível)
        mouth.style.background = "transparent";
        mouth.style.borderTop = "0";
        mouth.style.borderBottom = "3px solid #0f172a";

    } else if (dom === "esquizoide") {
        // Esquizoide: rosto retangular e expressão minimalista
        mouthHeight = 2;
        mouthWidth = 18;
        mouthBorderRadius = 2;
        mouthRotate = 0;
        mouthOffsetY = 7;

        eyeScaleX = 0.9;
        eyeScaleY = 0.6;      // Olhar fino e reto
        eyeOffsetY = 0;
        eyeGlowRadius = 0.4;
        eyeShadow = "rgba(15, 23, 42, 1)";
        eyeBg = "#020617";
        headShadow = "0 14px 32px rgba(15, 23, 42, 1), inset 0 -16px 28px rgba(15, 23, 42, 0.9)";
        headBorderRadius = "16px";  // Formato mais retangular
        headClipPath = "none";

    } else if (dom === "masoquista") {
        // Masoquista: cabeça quadrada, boca em U invertido e olhos pesados
        mouthHeight = 12;
        mouthWidth = 24;
        mouthBorderRadius = 999;
        mouthRotate = 0;
        mouthOffsetY = 7;

        eyeScaleX = 1.3;
        eyeScaleY = 0.8;
        eyeOffsetY = 0;
        eyeGlowRadius = 1.6;
        eyeShadow = "rgba(15, 23, 42, 0.7)";
        headBorderRadius = "10px";
        headClipPath = "none";

        // Boca em U invertido (apenas borda superior visível)
        mouth.style.background = "transparent";
        mouth.style.borderBottom = "0";
        mouth.style.borderTop = "3px solid #0f172a";

        // Olhos com leve queda nas extremidades externas
        const sadTilt = 10;  // Ajuste de inclinação para reforçar tristeza
        leftEyeSkewY = -sadTilt;   // Olho esquerdo: ponta externa mais baixa
        rightEyeSkewY = sadTilt;   // Olho direito: ponta externa mais baixa
        leftEyeExtraOffsetY = 1;
        rightEyeExtraOffsetY = 1;

    } else if (dom === "psicopatia") {
        // Psicopatia: topo da cabeça reto, queixo em V e olhar afiado
        mouthHeight = 2;
        mouthWidth = 22;
        mouthBorderRadius = 2;
        mouthRotate = 0;
        mouthOffsetY = 4;

        eyeScaleX = 1.2;
        eyeScaleY = 0.7;      // Olhar estreito
        eyeOffsetY = 0;
        eyeGlowRadius = 3.0;
        eyeShadow = "rgba(15, 23, 42, 0.6)";
        headBorderRadius = "10px"; // Cantos levemente arredondados
        headClipPath = "polygon(12% 0%, 88% 0%, 88% 70%, 50% 100%, 12% 70%)";

        // Olhos com pontas externas elevadas (postura dominante)
        const psychoTilt = 10;
        leftEyeSkewY = psychoTilt;    // Olho esquerdo: ponta externa mais alta
        rightEyeSkewY = -psychoTilt;  // Olho direito: ponta externa mais alta

    } else if (dom === "rigido") {
        // Rígido: proporções equilibradas e olhos retangulares
        mouthHeight = 4;
        mouthWidth = 20;
        mouthBorderRadius = 8;
        mouthRotate = 0;
        mouthOffsetY = 6;

        eyeScaleX = 1.25;
        eyeScaleY = 0.85;     // Olhar levemente retangular
        eyeOffsetY = 0;
        eyeGlowRadius = 2.2;
        eyeShadow = "rgba(15, 23, 42, 0.7)";
        headBorderRadius = "24px"; // Formato equilibrado
        headClipPath = "none";
    }

    // Atualiza propriedades da boca
    mouth.style.height = `${mouthHeight}px`;
    mouth.style.width = `${mouthWidth}px`;
    mouth.style.borderRadius = `${mouthBorderRadius}px`;
    mouth.style.transform = `translateY(${mouthOffsetY}px) rotate(${mouthRotate}deg)`;

    // Atualiza propriedades da cabeça
    head.style.boxShadow = headShadow;
    head.style.borderRadius = headBorderRadius;
    head.style.clipPath = headClipPath;

    // Atualiza olhos (skew/offset independentes)
    eyes.forEach((eye, index) => {
        const isLeft = index === 0; // Primeiro elemento = esquerdo; segundo = direito
        const skewY = isLeft ? leftEyeSkewY : rightEyeSkewY;
        const extraY = isLeft ? leftEyeExtraOffsetY : rightEyeExtraOffsetY;

        eye.style.background = eyeBg;
        eye.style.transformOrigin = "50% 50%";
        eye.style.transform =
            `translateY(${eyeOffsetY + extraY}px) ` +
            `scale(${eyeScaleX}, ${eyeScaleY}) ` +
            `skewY(${skewY}deg)`;
        eye.style.boxShadow =
            `0 1px 2px ${eyeShadow}, ` +
            `0 0 0 ${eyeGlowRadius}px rgba(248, 250, 252, 0.7)`;
    });
}

function randomizeTraits() {
    traits.oral = Math.random() * 100;
    traits.esquizoide = Math.random() * 100;
    traits.masoquista = Math.random() * 100;
    traits.psicopatia = Math.random() * 100;
    traits.rigido = Math.random() * 100;

    normalizeTraits();
    applyTraitsToUI();
    applyTraitsToBody();
}

function resetTraits() {
    traits.oral =
        traits.esquizoide =
        traits.masoquista =
        traits.psicopatia =
        traits.rigido =
            20;
    applyTraitsToUI();
    applyTraitsToBody();
}

/**
 * Captura visual do painel completo para exportar como imagem/PDF.
 * Aqui usamos o container principal `.app`, que inclui avatar, sliders,
 * resumo de perfil, questionário e rodapé explicativo.
 */

/* =========================================================
 * QUESTIONÁRIO DE TRAÇOS (Likert 1–5)
 * =======================================================*/

/**
 * Cada pergunta aponta mais forte para 1 ou 2 traços.
 * As respostas vão de 1 (Discordo totalmente) a 5 (Concordo totalmente)
 * e são multiplicadas pelos pesos de cada traço. No final,
 * normalizamos os resultados para gerar um percentual para
 * Oral, Esquizoide, Masoquista, Psicopatia e Rígido.
 */

function buildQuestionBank() {
    const items = [];

    /**
     * Para evitar que a pessoa "adivinhe" qual traço está sendo medido,
     * as perguntas abaixo usam situações do dia a dia sem citar nomes
     * de traços ou termos muito técnicos.
     */

    function addTraitQuestions(traitKey, texts) {
        texts.forEach((text, index) => {
            items.push({
                id: `${traitKey}-${index + 1}`,
                traitKey,
                text,
            });
        });
    }

    // Perguntas voltadas ao traço Oral (acolhimento e proximidade)
    addTraitQuestions("oral", [
        "Costumo me sentir melhor quando posso conversar abertamente com alguém sobre o que estou vivendo.",
        "Em dias difíceis, busco companhia, mensagens ou chamadas de vídeo para me sentir mais em paz.",
        "Gosto bastante de momentos simples de convivência, como tomar um café e jogar conversa fora.",
        "Quando algo bom acontece, tenho vontade de compartilhar rapidamente com alguém próximo.",
        "Sinto que o clima afetivo de um lugar (acolhimento, receptividade) influencia muito meu bem-estar.",
        "Fico um pouco incomodado(a) quando percebo que alguém importante para mim está distante ou mais frio(a).",
        "Tenho facilidade em demonstrar carinho por gestos, palavras ou pequenas gentilezas.",
        "Percebo que ambientes mais calorosos e descontraídos me ajudam a relaxar e a ser eu mesmo(a).",
        "Geralmente noto se as pessoas ao meu redor estão confortáveis ou à vontade e isso importa para mim.",
        "Em festas ou reuniões, valorizo mais o papo gostoso do que a programação em si."
    ]);

    // Perguntas voltadas ao traço Esquizoide (reserva e espaço pessoal)
    addTraitQuestions("esquizoide", [
        "Ter momentos sozinho(a), pensando ou fazendo algo em silêncio, é essencial para eu me recompor.",
        "Depois de muitas interações sociais, sinto vontade de me afastar um pouco para organizar minhas ideias.",
        "Frequentemente observo mais do que participo ativamente das conversas em grupo.",
        "Tenho a sensação de que meu mundo interno (pensamentos, imaginações) é bem rico e ocupado.",
        "Gosto de mergulhar em atividades solitárias, como ler, estudar ou explorar algum interesse específico.",
        "Às vezes demoro um pouco para confiar e me abrir emocionalmente com pessoas novas.",
        "Costumo precisar de tempo para processar o que sinto antes de colocar em palavras.",
        "Em encontros sociais, por vezes prefiro ficar em um cantinho mais tranquilo em vez de estar no centro da atenção.",
        "Não sinto necessidade de estar o tempo todo enviando mensagens ou interagindo para manter um vínculo.",
        "Com certa frequência, me pego “viajando” em pensamentos, mesmo estando acompanhado(a)."
    ]);

    // Perguntas voltadas ao traço Masoquista (resiliência e contenção)
    addTraitQuestions("masoquista", [
        "Costumo assumir muitas responsabilidades, mesmo quando já estou com a agenda cheia.",
        "Em várias situações, acabo dizendo “sim” para não desapontar os outros, mesmo estando cansado(a).",
        "Tenho facilidade em perceber as necessidades alheias e, às vezes, deixo as minhas para depois.",
        "Muitas vezes seguro um desconforto ou chateação para não criar conflito no momento.",
        "É comum que eu vá até o fim em tarefas difíceis, mesmo quando sinto vontade de desistir.",
        "Às vezes me pego pensando que aguento mais do que deveria em certas relações ou contextos.",
        "Tenho tendência a me sentir responsável pelo clima e pela harmonia de um ambiente.",
        "Quando algo me incomoda, posso demorar para expressar, esperando o “momento certo”.",
        "Mesmo cansado(a), ainda assim busco cumprir o que me comprometi a fazer.",
        "É relativamente comum eu colocar o bem-estar de outras pessoas antes do meu, ao tomar decisões."
    ]);

    // Perguntas voltadas ao traço Psicopatia (estratégia e condução de cenários)
    addTraitQuestions("psicopatia", [
        "Em conversas importantes, reparo facilmente nas entrelinhas e em como as pessoas se posicionam.",
        "Geralmente percebo qual abordagem ajuda mais a convencer alguém de uma ideia.",
        "Em situações de grupo, é natural que eu acabe assumindo um papel de condução ou direção.",
        "Costumo planejar alguns passos à frente quando preciso tomar decisões relevantes.",
        "Tenho certa facilidade para adaptar meu jeito de falar conforme a pessoa com quem estou.",
        "Em negociações, presto atenção na troca implícita de interesses, não só no que é dito.",
        "Quando entro em um ambiente novo, rapidamente avalio quem influencia mais as decisões ali.",
        "Muitas vezes eu noto oportunidades de liderar ou organizar algo antes que os outros percebam.",
        "Em contextos de incerteza, consigo manter a cabeça mais fria para pensar estrategicamente.",
        "Frequentemente penso em quais caminhos podem me dar mais margem de manobra em uma situação."
    ]);

    // Perguntas voltadas ao traço Rígido (padrão, estética e desempenho)
    addTraitQuestions("rigido", [
        "Costumo me dedicar bastante para entregar algo bem feito, mesmo em tarefas simples.",
        "Fico incomodado(a) quando sinto que fiz algo “mais ou menos” e não no padrão que eu gostaria.",
        "Antes de tomar decisões importantes, avalio bastante o impacto sobre minha imagem ou reputação.",
        "Em geral, tenho facilidade em perceber detalhes que estão fora do lugar em apresentações, trabalhos ou ambientes.",
        "É comum eu revisar o que fiz para ter certeza de que está dentro do nível que considero aceitável.",
        "Críticas mexem comigo e, mesmo quando construtivas, posso ficar repassando o que foi dito depois.",
        "Gosto quando as coisas têm certa harmonia visual ou organizacional, não apenas funcional.",
        "Planejo com frequência como posso melhorar meu desempenho em áreas que considero importantes.",
        "Quando vou me expor em público (trabalho, apresentações, redes sociais), penso bastante em como isso será visto.",
        "Às vezes sinto dificuldade em relaxar totalmente se percebo que ainda há algo a “aperfeiçoar” em um projeto."
    ]);

    return items;
}

const FULL_QUESTION_BANK = buildQuestionBank();

// Estado corrente do questionário
let quizState = {
    questions: [],
    index: 0,
    answers: {}, // Respostas por pergunta (0 a 4)
};

function shuffleArray(arr) {
    const copy = arr.slice();
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
}

function startQuiz(length) {
    if (!quizArea) return;

    const total = Math.max(1, Math.min(length, FULL_QUESTION_BANK.length));
    const shuffled = shuffleArray(FULL_QUESTION_BANK);
    const selected = shuffled.slice(0, total);

    quizState = {
        questions: selected,
        index: 0,
        answers: {},
    };

    quizArea.classList.remove("hidden");
    renderCurrentQuestion();

    if (quizResultText) {
        quizResultText.textContent =
            "Responda às perguntas abaixo. Ao final, o avatar será atualizado com os percentuais calculados.";
    }
}

function renderCurrentQuestion() {
    if (!quizArea || !quizQuestionText || !quizOptions || !quizProgress || !quizTraitLabel) return;
    if (!quizState.questions.length) {
        quizArea.classList.add("hidden");
        return;
    }

    const q = quizState.questions[quizState.index];
    const total = quizState.questions.length;

    quizProgress.textContent = `Pergunta ${quizState.index + 1} de ${total}`;
    quizTraitLabel.textContent = ``;
    quizQuestionText.textContent = q.text;

    quizOptions.innerHTML = "";

    const labels = [
        "Discordo totalmente",
        "Discordo",
        "Neutro",
        "Concordo",
        "Concordo totalmente",
    ];

    labels.forEach((label, value) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "quiz-option-btn";
        btn.textContent = label;

        const currentValue = quizState.answers[q.id];
        if (currentValue === value) {
            btn.classList.add("selected");
        }

        btn.addEventListener("click", () => {
            handleQuizAnswer(value);
        });

        quizOptions.appendChild(btn);
    });
}

function handleQuizAnswer(value) {
    if (!quizState.questions.length) return;

    const q = quizState.questions[quizState.index];
    quizState.answers[q.id] = value;

    const lastIndex = quizState.questions.length - 1;
    if (quizState.index < lastIndex) {
        quizState.index += 1;
        renderCurrentQuestion();
    } else {
        finishQuiz();
    }
}

function finishQuiz() {
    const scores = {
        oral: 0,
        esquizoide: 0,
        masoquista: 0,
        psicopatia: 0,
        rigido: 0,
    };
    const counts = {
        oral: 0,
        esquizoide: 0,
        masoquista: 0,
        psicopatia: 0,
        rigido: 0,
    };

    // Agrega respostas
    quizState.questions.forEach((q) => {
        let v = quizState.answers[q.id];
        if (typeof v !== "number") {
            v = 2; // Valor neutro caso a pergunta tenha sido pulada
        }
        scores[q.traitKey] += v;
        counts[q.traitKey] += 1;
    });

    // Converte em percentual relativo (normalizado para 100%)
    const raw = {};
    let totalRaw = 0;

    TRAITS_KEYS.forEach((key) => {
        const c = counts[key] || 1;
        const avg = scores[key] / (4 * c); // Valor médio entre 0 e 1
        const val = avg * 100;
        raw[key] = val;
        totalRaw += val;
    });

    if (totalRaw <= 0) totalRaw = 1;

    TRAITS_KEYS.forEach((key) => {
        traits[key] = (raw[key] / totalRaw) * 100;
    });

    applyTraitsToUI();
    applyTraitsToBody();

    if (quizArea) {
        quizArea.classList.add("hidden");
    }

    if (quizResultText) {
        quizResultText.textContent =
            `Resultado do teste: ` +
            `${traits.oral.toFixed(0)}% Oral, ` +
            `${traits.esquizoide.toFixed(0)}% Esquizoide, ` +
            `${traits.masoquista.toFixed(0)}% Masoquista, ` +
            `${traits.psicopatia.toFixed(0)}% Psicopatia e ` +
            `${traits.rigido.toFixed(0)}% Rígido. ` +
            `Esses percentuais somam 100% e são usados apenas para desenhar uma representação visual ` +
            `do seu “DNA de traços”, sem qualquer finalidade diagnóstica.`;
    }
}

/**
 * Liga o botão de início do questionário aos handlers.
 */
function setupQuizUI() {
    if (!quizStartButton || !quizLengthSelect) return;

    quizStartButton.addEventListener("click", () => {
        const length = parseInt(quizLengthSelect.value, 10) || 10;
        startQuiz(length);
    });
}


async function captureAppCanvas() {
    const root = document.querySelector(".app");
    if (!root) {
        alert("Não foi possível localizar o painel para exportação.");
        return null;
    }
    if (typeof html2canvas === "undefined") {
        alert("Biblioteca de captura (html2canvas) não carregada.");
        return null;
    }

    // Captura em alta resolução (scale 2) e fundo escuro coerente com o layout
    const canvas = await html2canvas(root, {
        backgroundColor: "#020617",
        scale: 2,
    });
    return canvas;
}

/**
 * Salvar como imagem (PNG)
 */
async function handleSaveImage() {
    const canvas = await captureAppCanvas();
    if (!canvas) return;

    const dataUrl = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = "dna_tracos_avatar.png";
    link.click();
}

/**
 * Salvar como PDF (botão em vermelho)
 */
async function handleSavePdf() {
    const canvas = await captureAppCanvas();
    if (!canvas) return;

    const imgData = canvas.toDataURL("image/png");

    if (!window.jspdf || !window.jspdf.jsPDF) {
        alert("Biblioteca de PDF (jsPDF) não carregada.");
        return;
    }

    const { jsPDF } = window.jspdf;

    // Formato baseado no tamanho do canvas capturado
    const pdf = new jsPDF({
        orientation: "landscape",
        unit: "px",
        format: [canvas.width, canvas.height],
    });

    pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
    pdf.save("dna_tracos_avatar.pdf");
}

function confirmCharacter() {
    const text =
        `Seu personagem foi confirmado com o seguinte DNA de traços:\n` +
        `- Oral: ${traits.oral.toFixed(1)}%\n` +
        `- Esquizoide: ${traits.esquizoide.toFixed(1)}%\n` +
        `- Masoquista: ${traits.masoquista.toFixed(1)}%\n` +
        `- Psicopatia: ${traits.psicopatia.toFixed(1)}%\n` +
        `- Rígido: ${traits.rigido.toFixed(1)}%`;

    alert(text);
    console.log("[DNA de Traços] Personagem confirmado:", traits);
}

function init() {
    // Sliders de traços
    Object.values(sliders).forEach((slider) => {
        slider.addEventListener("input", updateFromSliders);
    });

    // Botões principais
    const btnRandom = document.getElementById("btn-random");
    const btnReset = document.getElementById("btn-reset");
    const btnSavePng = document.getElementById("btn-save-png");
    const btnSavePdf = document.getElementById("btn-save-pdf");

    if (btnRandom) {
        btnRandom.addEventListener("click", randomizeTraits);
    }
    if (btnReset) {
        btnReset.addEventListener("click", resetTraits);
    }
    if (btnSavePng) {
        btnSavePng.addEventListener("click", handleSaveImage);
    }
    if (btnSavePdf) {
        btnSavePdf.addEventListener("click", handleSavePdf);
    }

    // Questionário de traços
    setupQuizUI();

    normalizeTraits();
    applyTraitsToUI();
    applyTraitsToBody();
}

window.addEventListener("DOMContentLoaded", init);
