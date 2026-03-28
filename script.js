document.addEventListener('DOMContentLoaded', () => {

    /* =========================================
       NAVEGAÇÃO (TABS)
    ========================================= */
    const navBtns = document.querySelectorAll('.nav-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    const mobileToggle = document.getElementById('mobile-toggle');
    const sidebar = document.querySelector('.sidebar');

    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active classes
            navBtns.forEach(b => b.classList.remove('active'));
            tabPanes.forEach(p => p.classList.remove('active'));

            // Add active to clicked
            btn.classList.add('active');
            const target = btn.getAttribute('data-tab');
            document.getElementById(`tab-${target}`).classList.add('active');

            // Close mobile menu if open
            if(window.innerWidth <= 900) {
                sidebar.classList.remove('open');
            }
        });
    });

    mobileToggle.addEventListener('click', () => {
        sidebar.classList.toggle('open');
    });

    function formatDin(val) { return val.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'}); }

    /* =========================================
       1. REGRA DE TRÊS
    ========================================= */
    const r3_inputA = document.getElementById('valor-a'); const r3_inputB = document.getElementById('valor-b');
    const r3_inputC = document.getElementById('valor-c'); const r3_outputX = document.getElementById('valor-x');
    const r3_toggle = document.getElementById('tipo-regra'); const r3_labelD = document.getElementById('label-direta');
    const r3_labelI = document.getElementById('label-inversa'); const r3_formula = document.getElementById('formula-text');

    function calcRegra3() {
        const a = parseFloat(r3_inputA.value); const b = parseFloat(r3_inputB.value); const c = parseFloat(r3_inputC.value);
        if (!isNaN(a) && !isNaN(b) && !isNaN(c) && a !== 0) {
            let res;
            if (r3_toggle.checked) {
                res = c === 0 ? "Erro" : (a * b) / c; r3_formula.textContent = `X = (${a} × ${b}) ÷ ${c}`;
            } else {
                res = (b * c) / a; r3_formula.textContent = `X = (${b} × ${c}) ÷ ${a}`;
            }
            r3_outputX.value = typeof res === 'number' ? parseFloat(res.toFixed(4)) : res;
            r3_formula.parentElement.classList.add('calculated');
        } else {
            r3_outputX.value = ''; r3_formula.parentElement.classList.remove('calculated');
            r3_formula.textContent = r3_toggle.checked ? 'X = (A × B) ÷ C' : 'X = (B × C) ÷ A';
        }
    }
    [r3_inputA, r3_inputB, r3_inputC].forEach(el => el.addEventListener('input', calcRegra3));
    r3_toggle.addEventListener('change', () => {
        r3_toggle.checked ? (r3_labelI.classList.add('active'), r3_labelD.classList.remove('active')) 
                          : (r3_labelD.classList.add('active'), r3_labelI.classList.remove('active'));
        calcRegra3();
    });
    document.getElementById('clear-btn').addEventListener('click', () => {
        r3_inputA.value = ''; r3_inputB.value = ''; r3_inputC.value = ''; r3_outputX.value = ''; calcRegra3();
    });

    /* =========================================
       2. PORCENTAGEM
    ========================================= */
    const p1_a = document.getElementById('perc-v1-a'); const p1_b = document.getElementById('perc-v1-b'); const p1_res = document.getElementById('perc-res-1');
    const p2_a = document.getElementById('perc-v2-a'); const p2_b = document.getElementById('perc-v2-b'); const p2_res = document.getElementById('perc-res-2');
    const p3_a = document.getElementById('perc-v3-a'); const p3_b = document.getElementById('perc-v3-b'); const p3_res = document.getElementById('perc-res-3');

    function calcPerc() {
        const v1a = parseFloat(p1_a.value); const v1b = parseFloat(p1_b.value);
        if(!isNaN(v1a) && !isNaN(v1b)) { p1_res.textContent = parseFloat(((v1a/100)*v1b).toFixed(2)); } else { p1_res.textContent = "Resultado"; }
        const v2a = parseFloat(p2_a.value); const v2b = parseFloat(p2_b.value);
        if(!isNaN(v2a) && !isNaN(v2b) && v2b !== 0) { p2_res.textContent = parseFloat(((v2a/v2b)*100).toFixed(2)) + "%"; } else { p2_res.textContent = "Resultado"; }
        const v3a = parseFloat(p3_a.value); const v3b = parseFloat(p3_b.value);
        if(!isNaN(v3a) && !isNaN(v3b)) { p3_res.textContent = parseFloat((v3a + (v3a*(v3b/100))).toFixed(2)); } else { p3_res.textContent = "Resultado"; }
    }
    [p1_a, p1_b, p2_a, p2_b, p3_a, p3_b].forEach(el => el.addEventListener('input', calcPerc));
    window.limparPorcentagem = function() { [p1_a, p1_b, p2_a, p2_b, p3_a, p3_b].forEach(el => el.value = ''); calcPerc(); };

    /* =========================================
       3. QUAL COMPENSA MAIS? (MERCADO)
    ========================================= */
    const m_pA = document.getElementById('merc-preco-a'); const m_wA = document.getElementById('merc-peso-a'); const m_rA = document.getElementById('merc-res-a');
    const m_pB = document.getElementById('merc-preco-b'); const m_wB = document.getElementById('merc-peso-b'); const m_rB = document.getElementById('merc-res-b');
    const m_winner = document.getElementById('winner-card'); const cardA = document.getElementById('card-prod-a'); const cardB = document.getElementById('card-prod-b');

    function calcMercado() {
        const pa = parseFloat(m_pA.value); const wa = parseFloat(m_wA.value); const pb = parseFloat(m_pB.value); const wb = parseFloat(m_wB.value);
        let unitA = null; let unitB = null; cardA.classList.remove('winner'); cardB.classList.remove('winner');
        m_winner.style.color = 'var(--text-secondary)';
        if(!isNaN(pa) && !isNaN(wa) && wa > 0) { unitA = pa/wa; m_rA.textContent = unitA.toFixed(4); } else { m_rA.textContent = "0.00"; }
        if(!isNaN(pb) && !isNaN(wb) && wb > 0) { unitB = pb/wb; m_rB.textContent = unitB.toFixed(4); } else { m_rB.textContent = "0.00"; }
        if(unitA !== null && unitB !== null) {
            m_winner.style.color = 'var(--accent-green)';
            if(unitA < unitB) { m_winner.textContent = `🏆 Leve o Produto A! (Ele é ${(((unitB-unitA)/unitB)*100).toFixed(1)}% mais barato)`; cardA.classList.add('winner'); } 
            else if (unitB < unitA) { m_winner.textContent = `🏆 Leve o Produto B! (Ele é ${(((unitA-unitB)/unitA)*100).toFixed(1)}% mais barato)`; cardB.classList.add('winner'); } 
            else { m_winner.textContent = "⚖️ Estão empatados! Dá na mesma."; }
        } else { m_winner.textContent = "Preencha os valores para descobrir o mais barato."; }
    }
    [m_pA, m_wA, m_pB, m_wB].forEach(el => el.addEventListener('input', calcMercado));

    /* =========================================
       4. DIVISÃO DE CONTA
    ========================================= */
    const div_tot = document.getElementById('div-total'); const div_gorj = document.getElementById('div-gorjeta'); const div_pes = document.getElementById('div-pessoas');
    const div_rSub = document.getElementById('div-res-sub'); const div_rGorj = document.getElementById('div-res-gorjeta'); 
    const div_rInd = document.getElementById('div-res-ind'); const div_rTot = document.getElementById('div-res-total');

    function calcDivisao() {
        const tot = parseFloat(div_tot.value) || 0; const gorj = parseFloat(div_gorj.value) || 0; const pes = parseInt(div_pes.value) > 0 ? parseInt(div_pes.value) : 1;
        const valGorjeta = tot * (gorj/100); const finalTot = tot + valGorjeta; const ind = finalTot / pes;
        div_rSub.textContent = formatDin(tot); div_rGorj.textContent = formatDin(valGorjeta); div_rTot.textContent = formatDin(finalTot); div_rInd.textContent = formatDin(ind);
    }
    [div_tot, div_gorj, div_pes].forEach(el => el.addEventListener('input', calcDivisao));

    /* =========================================
       5. JUROS COMPOSTOS
    ========================================= */
    const jur_ini = document.getElementById('jur-inicial'); const jur_men = document.getElementById('jur-mensal');
    const jur_tax = document.getElementById('jur-taxa'); const jur_tem = document.getElementById('jur-tempo');
    const jur_rInv = document.getElementById('jur-res-investido'); const jur_rRen = document.getElementById('jur-res-rendimento'); const jur_rTot = document.getElementById('jur-res-total');

    function calcJuros() {
        const ini = parseFloat(jur_ini.value) || 0; const men = parseFloat(jur_men.value) || 0; const tax = parseFloat(jur_tax.value) || 0; const anos = parseInt(jur_tem.value) || 0;
        const meses = anos * 12; const taxaMensal = (tax / 100) / 12; let montanteGeral = ini;
        for(let i=0; i<meses; i++) { montanteGeral += men; montanteGeral += montanteGeral * taxaMensal; }
        const aportesTotais = ini + (men * meses); const jurosTotais = montanteGeral - aportesTotais;
        jur_rInv.textContent = formatDin(aportesTotais); jur_rRen.textContent = formatDin(jurosTotais > 0 ? jurosTotais : 0); jur_rTot.textContent = formatDin(montanteGeral > 0 ? montanteGeral : 0);
    }
    [jur_ini, jur_men, jur_tax, jur_tem].forEach(el => el.addEventListener('input', calcJuros));

    /* =========================================
       6. IMC
    ========================================= */
    const imc_pes = document.getElementById('imc-peso'); const imc_alt = document.getElementById('imc-altura');
    const imc_cir = document.getElementById('imc-circle'); const imc_status = document.getElementById('imc-status');

    function calcIMC() {
        const p = parseFloat(imc_pes.value); let a = parseFloat(imc_alt.value);
        if(!isNaN(p) && !isNaN(a) && a > 0 && p > 0) {
            if(a > 3) a = a/100;
            const imc = p / (a * a); imc_cir.textContent = imc.toFixed(1);
            let cor, txt;
            if(imc < 18.5) { cor = "var(--accent-blue)"; txt = "Abaixo do Peso"; }
            else if(imc < 24.9) { cor = "var(--accent-green)"; txt = "Peso Normal"; }
            else if(imc < 29.9) { cor = "var(--accent-warning)"; txt = "Sobrepeso"; }
            else { cor = "var(--accent-secondary)"; txt = "Obesidade"; }
            imc_cir.style.borderColor = cor; imc_cir.style.color = cor; imc_circle.style.boxShadow = `0 0 30px ${cor}40`; imc_status.textContent = txt; imc_status.style.color = cor;
        } else {
            imc_cir.textContent = "0.0"; imc_status.textContent = "Aguardando dados..."; imc_cir.style.borderColor = "var(--border-card)"; imc_cir.style.color = "#fff"; imc_circle.style.boxShadow = "none"; imc_status.style.color = "var(--text-secondary)";
        }
    }
    [imc_pes, imc_alt].forEach(el => el.addEventListener('input', calcIMC));

    /* =========================================
       7. CHURRASCO
    ========================================= */
    const ch_h = document.getElementById('ch-homens'); const ch_m = document.getElementById('ch-mulheres'); const ch_c = document.getElementById('ch-criancas');
    const ch_alc = document.getElementById('ch-alcool');
    const chr_c = document.getElementById('ch-res-carne'); const chr_a = document.getElementById('ch-res-acomp');
    const chr_b = document.getElementById('ch-res-cerveja'); const chr_r = document.getElementById('ch-res-refri');

    function calcChurrasco() {
        const hom = parseInt(ch_h.value) || 0; const mul = parseInt(ch_m.value) || 0; const cri = parseInt(ch_c.value) || 0;
        // Carnes (kg): H: 400g, M: 300g, C: 200g
        const carnes = (hom * 0.4) + (mul * 0.3) + (cri * 0.2);
        // Acompanhamentos (kg): 150g geral
        const acomp = (hom + mul + cri) * 0.15;
        // Bebidas: 
        let cerveja = 0; let refri = 0;
        if(!ch_alc.checked) {
            // Com Álcool: H: 1.5L Cerva, M: 1L Cerva. C: 1L Refri. Adultos tbm tomam um gole de agua/refri (500ml)
            cerveja = (hom * 1.5) + (mul * 1.0);
            refri = (cri * 1.0) + ((hom + mul) * 0.5);
        } else {
            // Sem Álcool: Todos tomam refri/agua 1.2L adulto, 1L criança
            refri = ((hom + mul) * 1.2) + (cri * 1.0);
        }

        chr_c.textContent = carnes.toFixed(1) + " KG";
        chr_a.textContent = acomp.toFixed(1) + " KG";
        chr_b.textContent = cerveja > 0 ? cerveja.toFixed(1) + " L" : "0 L";
        chr_b.style.color = cerveja > 0 ? "var(--accent-green)" : "var(--text-secondary)";
        chr_r.textContent = refri.toFixed(1) + " L";
    }
    [ch_h, ch_m, ch_c, ch_alc].forEach(el => el.addEventListener('input', calcChurrasco));
    ch_alc.addEventListener('change', calcChurrasco);

    /* =========================================
       8. COMBUSTÍVEL E VIAGEM
    ========================================= */
    const cb_a = document.getElementById('cb-alcool'); const cb_g = document.getElementById('cb-gasolina'); const cb_win = document.getElementById('cb-winner');
    const cb_d = document.getElementById('cb-dist'); const cb_kml = document.getElementById('cb-kml'); const cb_p = document.getElementById('cb-preco'); const cb_cust = document.getElementById('cb-custo');

    function calcCombustivel() {
        const a = parseFloat(cb_a.value); const g = parseFloat(cb_g.value);
        if(!isNaN(a) && !isNaN(g) && g > 0) {
            const relacao = a / g;
            if(relacao < 0.7) {
                cb_win.textContent = "🟢 Abasteça com ÁLCOOL! (Custa menos que 70% da Gasolina)";
                cb_win.style.color = "var(--accent-green)";
            } else if (relacao > 0.7) {
                cb_win.textContent = "🔴 Abasteça com GASOLINA! (Álcool não compensa)";
                cb_win.style.color = "var(--accent-secondary)";
            } else {
                cb_win.textContent = "⚪ Tanto faz, relação exata de 70%.";
                cb_win.style.color = "#fff";
            }
        } else { cb_win.textContent = "Aguardando preços..."; cb_win.style.color = "var(--accent-green)"; }

        const dist = parseFloat(cb_d.value); const kml = parseFloat(cb_kml.value); const pre = parseFloat(cb_p.value);
        if(!isNaN(dist) && !isNaN(kml) && !isNaN(pre) && kml > 0) {
            const litros = dist / kml;
            const custo = litros * pre;
            cb_cust.textContent = formatDin(custo);
        } else {
            cb_cust.textContent = "R$ 0.00";
        }
    }
    [cb_a, cb_g, cb_d, cb_kml, cb_p].forEach(el => el.addEventListener('input', calcCombustivel));

    /* =========================================
       9. HORAS TRABALHADAS
    ========================================= */
    const hr_e = document.getElementById('hr-entrada'); const hr_i = document.getElementById('hr-ida-almoco');
    const hr_v = document.getElementById('hr-volta-almoco'); const hr_s = document.getElementById('hr-saida');
    const hr_res = document.getElementById('hr-res');

    function parseTime(timeStr) {
        if(!timeStr) return 0;
        const [h, m] = timeStr.split(':');
        return parseInt(h) * 60 + parseInt(m);
    }

    function calcHoras() {
        const e = parseTime(hr_e.value); const i = parseTime(hr_i.value);
        const v = parseTime(hr_v.value); const s = parseTime(hr_s.value);

        if(e >= 0 && i >= 0 && v >= 0 && s >= 0) {
            // Conta Turno 1 (e->i) + Turno 2 (v->s). Se negativo, sum com 1440 (24h)
            let t1 = i - e; if(t1 < 0) t1 += 1440;
            let t2 = s - v; if(t2 < 0) t2 += 1440;
            const totais = t1 + t2;
            const fH = Math.floor(totais / 60); const fM = totais % 60;
            hr_res.textContent = `${fH.toString().padStart(2, '0')}h ${fM.toString().padStart(2, '0')}m`;
        }
    }
    [hr_e, hr_i, hr_v, hr_s].forEach(el => el.addEventListener('input', calcHoras));

    /* =========================================
       10. ASSINATURAS MENSAIS
    ========================================= */
    const subsList = document.getElementById('subs-list'); const addSubBtn = document.getElementById('add-sub-btn');
    const sub_mensal = document.getElementById('sub-res-mensal'); const sub_anual = document.getElementById('sub-res-anual');

    function createSubRow(name = "", val = "") {
        const div = document.createElement('div');
        div.className = 'subs-row';
        div.innerHTML = `
            <div class="input-group">
                <input type="text" class="sub-name" placeholder="Ex: Netflix" value="${name}">
                <label>Serviço</label>
            </div>
            <div class="input-group">
                <input type="number" class="sub-val" placeholder="0.00" value="${val}" step="any">
                <label>R$ Mensal</label>
            </div>
            <button class="del-sub-btn"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button>
        `;
        // Listeners for calc and delete
        div.querySelector('.del-sub-btn').addEventListener('click', () => {
            div.remove(); calcSubs();
        });
        div.querySelectorAll('input').forEach(inp => inp.addEventListener('input', calcSubs));
        subsList.appendChild(div);
        calcSubs();
    }

    function calcSubs() {
        const vals = document.querySelectorAll('.sub-val');
        let totalMes = 0;
        vals.forEach(inp => {
            const v = parseFloat(inp.value);
            if(!isNaN(v)) totalMes += v;
        });
        sub_mensal.textContent = formatDin(totalMes);
        sub_anual.textContent = formatDin(totalMes * 12);
    }

    addSubBtn.addEventListener('click', () => createSubRow());

    // Init with 2 examples
    createSubRow('Netflix', '39.90');
    createSubRow('Spotify', '21.90');

    // Run initial states explicitly for those who need
    calcChurrasco();
    calcCombustivel();
    calcHoras();

    /* =========================================
       11. SISTEMA DE LOGIN (FASE 3)
    ========================================= */
    const loginOverlay = document.getElementById('login-overlay');
    const appWrapper = document.getElementById('app-wrapper');
    const loginUser = document.getElementById('login-user');
    const loginPass = document.getElementById('login-pass');
    const loginBtn = document.getElementById('login-btn');
    const loginError = document.getElementById('login-error');

    function performLogin() {
        const u = loginUser.value.trim().toLowerCase();
        const p = loginPass.value.trim().toLowerCase();
        
        loginError.style.display = 'none';
        
        // Regex to extract the number from strings like "admin42" and "password42"
        const uMatch = u.match(/^admin(\d+)$/);
        const pMatch = p.match(/^password(\d+)$/);
        
        if (uMatch && pMatch) {
            const numU = parseInt(uMatch[1]);
            const numP = parseInt(pMatch[1]);
            
            // Validate limits (1 to 100) and if the numbers match
            if (numU >= 1 && numU <= 100 && numU === numP) {
                // Success!
                localStorage.setItem('calcpro_logged', 'true');
                loginOverlay.style.opacity = '0';
                setTimeout(() => {
                    loginOverlay.style.display = 'none';
                    appWrapper.style.display = 'flex';
                }, 500); // Wait for fade out
                return;
            }
        }
        
        // Fail
        loginError.style.display = 'block';
        loginOverlay.querySelector('.login-card').classList.add('shake');
        setTimeout(() => {
            loginOverlay.querySelector('.login-card').classList.remove('shake');
        }, 500);
    }

    loginBtn.addEventListener('click', performLogin);
    
    // Pressing Enter simulates a click
    [loginUser, loginPass].forEach(input => {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') performLogin();
        });
    });

    // Logout logic
    document.getElementById('logout-btn').addEventListener('click', () => {
        localStorage.removeItem('calcpro_logged');
        location.reload();
    });

    // Check existing session
    if (localStorage.getItem('calcpro_logged') === 'true') {
        loginOverlay.style.display = 'none';
        appWrapper.style.display = 'flex';
    }

    /* =========================================
       12. PROGRESSIVE WEB APP (SW)
    ========================================= */
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('sw.js').then(reg => {
                console.log('Service Worker Registrado: ', reg.scope);
            }).catch(err => {
                console.log('Falha no Service Worker: ', err);
            });
        });
    }

});
