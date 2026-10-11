(function() 
{
    const G = 300, T = 194;
    const TH = G - T;          // altura real do bloco (o scale do tile é feito a partir do chão G)
    const SQ = .3;             // escala do bloco quando é esmagado no impacto
    const CX = [130, 185, 240, 295, 350, 405, 460, 515, 570, 625, 680];
    const DURATION = 5000;     // a animação roda uma vez e para aqui

    // --- Momentos-chave da animação no "n" ---
    const LAND1  = 2400;       // aterra em cima do n
    const HOP1   = 2550;       // 1º saltinho
    const HOP2   = 2950;       // 2º saltinho (o último "forte")
    const SWAP   = 3350;       // IMPACTO do último salto forte -> a letra troca aqui
    const LAUNCH = 3500;       // o bloco solta e lança o mascote na pirueta
    const SPIN_END = 4200;     // fim da pirueta/queda (já invisível)
    const FALL_DIST = 270;     // distância da queda (T + 270 fica bem abaixo do chão)

    const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
    const lerp = (a, b, p) => a + (b - a) * p;
    const easeIO = p => p < .5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
    const easeOutBack = p => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * Math.pow(p - 1, 3) + c1 * Math.pow(p - 1, 2); };
    const bump = (t, t0, dur, amp) => (t >= t0 && t < t0 + dur) ? amp * Math.sin(Math.PI * (t - t0) / dur) : 0;
    const wob = (dt, dur) => { const d = dt / dur; return (d >= 0 && d <= 1) ? .26 * Math.exp(-5 * d) * Math.cos(9 * d) : 0; };

    const screen = document.getElementById('splash-screen');
    const $ = id => screen.querySelector('#' + id);
    
    const tiles = Array.from({length: 11}, (_, i) => screen.querySelector('#tile' + i));
    const partsG = $('parts');
    const NP = 14;
    const parts = [];
    
    for (let i = 0; i < NP; i++) 
    {
        const r = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        r.setAttribute('fill', i % 2 ? '#F5A524' : '#F2E8D5');
        r.setAttribute('opacity', 0);
        partsG.appendChild(r);
        parts.push(r);
    }

    function tileSy(i, t) 
    {
        let s = 1;
        if (i === 2)
        {
            // pequenas afundadas quando o mascote aterra
            s -= bump(t, LAND1, 180, .14) + bump(t, HOP2, 180, .10);

            if (t >= SWAP && t < LAUNCH)            // impacto forte: esmaga o bloco
                s = lerp(1, SQ, easeIO((t - SWAP) / (LAUNCH - SWAP)));
            else if (t >= LAUNCH && t < LAUNCH + 500) // solta como uma mola e lança o mascote
                s = lerp(SQ, 1, easeOutBack((t - LAUNCH) / 500));
        }
        return s;
    }

    function mascotState(t) 
    {
        let x = -100, y = G, sx = 1, sy = 1, rot = 0, lx = 1, ly = 0, open = 0, air = false, fade = 1;
        const arc = (t0, t1, x0, y0, x1, y1, h) => 
        {
            const p = clamp((t - t0) / (t1 - t0), 0, 1);
            x = lerp(x0, x1, p);
            y = lerp(y0, y1, p) - 4 * h * p * (1 - p);
            const st = .2 * Math.abs(Math.cos(Math.PI * p));
            sy = 1 + st; sx = 1 - .5 * st;
            air = true; open = 1;
            return p;
        };
        const crouch = (t0, t1) => { const k = clamp((t - t0) / (t1 - t0), 0, 1); sy = lerp(1, .72, easeIO(k)); sx = 1 + (1 - sy) * .7; };

        const launchY = G - TH * SQ;   // altura do topo do bloco quando está esmagado

        if (t < 520) { arc(0, 520, -60, G, 60, G, 55); }                     // Entrada
        else if (t < 900) { arc(520, 900, 60, G, 130, G, 40); }              // Corre até ao W
        else if (t < 1250) { arc(900, 1250, 130, G, 185, G, 40); }           // Corre até ao i
        else if (t < 1600) { arc(1250, 1600, 185, G, 240, G, 40); }          // Corre até ao n no chão
        else if (t < 1800) { x = 240; y = G; crouch(1600, 1800); }           // Agacha no chão em frente ao n
        else if (t < LAND1) { arc(1800, LAND1, 240, G, 240, T, 110); ly = -.5; } // Sobe para o topo do n
        else if (t < HOP1) { x = 240; y = T; lx = 0; }                       // Aterra em cima do n
        else if (t < HOP2) { arc(HOP1, HOP2, 240, T, 240, T, 62); lx = 0; }  // 1º saltinho
        else if (t < SWAP) { arc(HOP2, SWAP, 240, T, 240, T, 78); lx = 0; }  // 2º saltinho (forte) -> impacto = SWAP
        else if (t < LAUNCH) { x = 240; y = T; crouch(SWAP, LAUNCH); lx = 0; ly = 1; } // Afunda com o bloco
        else if (t < SPIN_END) {                                             // Lançado pelo bloco: pirueta 360º e cai atravessando tudo
            const p = arc(LAUNCH, SPIN_END, 240, launchY, 240, T + FALL_DIST, 326);
            rot = 360 * easeIO(p); lx = 0; ly = -1;
            fade = 1 - clamp((y - G) / 150, 0, 1); // desvanece ao atravessar o chão
            const btn = document.getElementById('splash-btn-enter');
            btn.style.opacity = '1';
            btn.style.pointerEvents = 'visible';
        }
        else { x = 240; y = T + FALL_DIST; fade = 0; }

        if (!air)
        {
            for (const L of [LAND1])
            {
                const e = wob(t - L, 420);
                if (e) { sy = 1 - e; sx = 1 + .7 * e; }
            }
        }

        let under = -1;
        if (t >= 1700 && t < 4650) CX.forEach((c, i) => { if (Math.abs(x - c) < 30) under = i; });
        let surf = G;
        if (under >= 0) 
        {
            const s = tileSy(under, t);
            // só acompanha o bloco quando está pousado nele (no ar o arco manda)
            if (!air) y += TH * (1 - s);
            surf = G - TH * s;
        }
        
        return { x, y, sx, sy, rot, lx, ly, open, surf, fade };
    }

    function draw(t) 
    {
        tiles.forEach((g, i) => 
        {
            if (!g) return;
            const sy = tileSy(i, t);
            g.setAttribute('transform', `translate(${CX[i]},${G}) scale(1,${sy.toFixed(3)}) translate(${-CX[i]},${-G})`);
        });

        const t0 = tiles[2], txt = t0.querySelector('text'), rects = t0.querySelectorAll('rect');
        const changed = t >= SWAP;   // a letra troca no impacto do último salto forte
        
        txt.textContent = changed ? 't' : 'n';
        rects[0].setAttribute('fill', changed ? '#C47F0E' : '#D9CBAE');
        rects[1].setAttribute('fill', changed ? '#F5A524' : '#F2E8D5');
        $('glowC').setAttribute('opacity', changed ? (.3 + .12 * Math.sin(t / 300)) * clamp((t - SWAP) / 300, 0, 1) : 0);

        const m = mascotState(t);
        $('mascot').setAttribute('transform',
            `translate(${m.x.toFixed(1)},${m.y.toFixed(1)}) translate(0,-30) rotate(${m.rot.toFixed(1)}) translate(0,30) scale(${m.sx.toFixed(3)},${m.sy.toFixed(3)})`);
        $('mascot').setAttribute('opacity', m.fade.toFixed(2));
        $('pl').setAttribute('cx', (-9 + m.lx * 2.8).toFixed(2));$('pl').setAttribute('cy', (-39 + m.ly * 2.4).toFixed(2));
        $('pr').setAttribute('cx', (9 + m.lx * 2.8).toFixed(2));$('pr').setAttribute('cy', (-39 + m.ly * 2.4).toFixed(2));

        const alt = Math.max(0, m.surf - m.y);
        const sc = clamp(1 - alt / 260, .25, 1);
        const sh = $('shadow');
        sh.setAttribute('cx', m.x.toFixed(1)); sh.setAttribute('cy', (m.surf + 1).toFixed(1));
        sh.setAttribute('rx', (22 * sc).toFixed(1)); sh.setAttribute('opacity', (.35 * sc * m.fade * clamp(1 - (m.y - m.surf) / 25, 0, 1)).toFixed(2));

        // partículas saem do n no momento do impacto
        const dt = (t - SWAP) / 1000;
        parts.forEach((r, i) => 
        {
            if (dt < 0 || dt > .85) { r.setAttribute('opacity', 0); return; }
            const ang = -Math.PI + (i + .5) * Math.PI / NP;
            const sp = 170 + (i * 37) % 120;
            const px = CX[2] + Math.cos(ang) * sp * dt;
            const py = T + 30 + Math.sin(ang) * sp * dt + 300 * dt * dt;
            const s = 6 + (i % 3) * 2;
            r.setAttribute('x', (px - s / 2).toFixed(1)); r.setAttribute('y', (py - s / 2).toFixed(1));
            r.setAttribute('width', s); r.setAttribute('height', s); r.setAttribute('rx', 1.5);
            r.setAttribute('transform', `rotate(${(dt * 300 * (i % 2 ? 1 : -1)).toFixed(0)} ${px.toFixed(1)} ${py.toFixed(1)})`);
            r.setAttribute('opacity', (1 - dt / .85).toFixed(2));
        });

        const p1 = easeIO(clamp((t - (SWAP + 350)) / 800, 0, 1));
        $('title').setAttribute('opacity', p1.toFixed(2));$('title').setAttribute('transform', `translate(0,${((1 - p1) * 18).toFixed(1)})`);

    }

    // Roda uma única vez ao abrir a tela e fica parado no quadro final (sem loop)
    const reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) 
    {
        draw(DURATION);
    } 
    else 
    {
        let start = 0, raf = null;
        const frame = now => 
        {
            const t = Math.max(0, now - start);
            if (t >= DURATION) { draw(DURATION); raf = null; return; }  // fim: desenha o quadro final e para
            draw(t);
            raf = requestAnimationFrame(frame);
        };
        const play = () => 
        {
            if (raf) cancelAnimationFrame(raf);
            start = performance.now();
            raf = requestAnimationFrame(frame);
        };
        play();
        $('stage').addEventListener('click', play);   // clique repete a animação (apaga esta linha se não quiseres)
    }
})();