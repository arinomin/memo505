const { useState, useEffect, useMemo } = React;

        // --- Constants based on 要件定義.txt ---

        const EFFECT_PARAMETERS = {
            "LPF": ["RATE", "DEPTH", "RESONANCE", "CUTOFF", "STEP_RATE"],
            "BPF": ["RATE", "DEPTH", "RESONANCE", "CUTOFF", "STEP_RATE"],
            "HPF": ["RATE", "DEPTH", "RESONANCE", "CUTOFF", "STEP_RATE"],
            "PHASER": ["RATE", "DEPTH", "RESONANCE", "MANUAL", "STEP_RATE", "D_LEVEL", "E_LEVEL", "STAGE"],
            "FLANGER": ["RATE", "DEPTH", "RESONANCE", "MANUAL", "STEP_RATE", "D_LEVEL", "E_LEVEL", "SEPARATION"],
            "SYNTH": ["FREQUENCY", "RESONANCE", "DECAY", "BALANCE"],
            "LO-FI": ["BITDEPTH", "SAMPLERATE", "BALANCE"],
            "RADIO": ["LOFI", "LEVEL"],
            "RING MOD": ["FREQUENCY", "BALANCE", "MODE"],
            "G2B": ["BALANCE", "MODE"],
            "SUSTAINER": ["ATTACK", "RELEASE", "LEVEL", "LOW_GAIN", "HI_GAIN", "SUSTAIN"],
            "AUTO RIFF": ["PHARASE", "TEMPO", "HOLD", "ATTACK", "LOOP", "KEY", "BALANCE"],
            "SLOW GEAR": ["SENS", "RISE_TIME", "LEVEL", "MODE"],
            "TRANSPOSE": ["TRANS", "MODE"],
            "PITCH BEND": ["PITCH", "BEND", "MODE"],
            "ROBOT": ["ROBOT_NOTE", "FORMANT", "MODE"],
            "ELECTRIC": ["SHIFT", "FORMANT", "SPEED", "STABILITY", "SCALE"],
            "HRM MANUAL": ["VOICE", "FORMANT", "PAN", "KEY", "D_LEVEL", "HRM_LEVEL"],
            "HRM AUTO(M)": ["VOICE", "FORMANT", "PAN", "HRM_MODE", "KEY", "D_LEVEL", "E_LEVEL"],
            "VOCODER": ["CARRIER", "TONE", "ATTACK", "MOD_SENS", "CARRIER_THRU", "BALANCE"],
            "OSC VOC(M)": ["CARRIER", "TONE", "ATTACK", "OCTAVE", "MOD_SENS", "RELEASE", "BALANCE"],
            "OSC BOT": ["OSC", "TONE", "ATTACK", "NOTE", "MOD_SENS", "BALANCE"],
            "PREAMP": ["AMP_TYPE", "SPK_TYPE", "GAIN", "T_COMP", "BASS", "MIDDLE", "TREBLE", "PRESENCE", "MIC_TYPE", "MIC_DIS", "MIC_POS", "E_LEVEL"],
            "DIST": ["TYPE", "TONE", "DIST", "D_LEVEL", "E_LEVEL"],
            "DYNAMICS": ["TYPE", "DYNAMICS"],
            "EQ": ["LOW_GAIN", "HI_GAIN", "LO_MID_FREQ", "LO_MID_Q", "LO_MID_GAIN", "HIGH_MID_FREQ", "HIGH_MID_Q", "HIGH_MID_GAIN", "LEVEL"],
            "ISOLATOR": ["BAND", "RATE", "BAND_LEVEL", "DEPTH", "STEP_RATE", "WAVE_FORM"],
            "OCTAVE": ["OCTAVE", "MODE", "OCTAVE_LEVEL"],
            "AUTO PAN": ["RATE", "WAVEFORM", "DEPTH", "INIT_PHASE", "STEP_RATE"],
            "MANUAL PAN": ["POSITION"],
            "STEREO ENHANCE": ["LO_CUT", "HI_CUT", "ENHANCE"],
            "TREMOLO": ["RATE", "DEPTH", "WAVEFORM"],
            "VIBRATO": ["RATE", "DEPTH", "COLOR", "D_LEVEL", "E_LEVEL"],
            "PATTERN SLICER": ["RATE", "DUTY", "ATTACK", "PATTERN", "DEPTH", "THRESHOLD", "GAIN"],
            "STEP SLICER": ["RATE", "DEPTH", "THRESHOLD", "GAIN"],
            "DELAY": ["TIME", "FEEDBACK", "D_LEVEL", "LOW_CUT", "HIGH_CUT", "E_LEVEL"],
            "PANNING DELAY": ["TIME", "FEEDBACK", "D_LEVEL", "LOW_CUT", "HIGH_CUT", "E_LEVEL"],
            "REVERSE DELAY": ["TIME", "FEEDBACK", "D_LEVEL", "LOW_CUT", "HIGH_CUT", "E_LEVEL"],
            "MOD DELAY": ["TIME", "FEEDBACK", "MOD_DEPTH", "D_LEVEL", "LOW_CUT", "HIGH_CUT", "E_LEVEL"],
            "TYPE ECHO 1": ["REPEAT_TIME", "INTENSITY", "D_LEVEL", "BASS", "TREBLE", "E_LEVEL"],
            "TYPE ECHO 2": ["TIME", "FEEDBACK", "D_LEVEL", "LOW_CUT", "HIGH_CUT", "E_LEVEL"],
            "GNR DELAY": ["TIME", "FEEDBACK", "E_LEVEL"],
            "WARP": ["LEVEL"],
            "TWIST": ["RELEASE", "RISE", "FALL", "LEVEL"],
            "ROLL 1": ["TIME", "FEEDBACK", "ROLL", "BALANCE"],
            "ROLL 2": ["TIME", "REPEAT", "ROLL", "BALANCE"],
            "FREEZE": ["ATTACK", "RELEASE", "DECAY", "SUSTAIN", "BALANCE"],
            "CHORUS": ["RATE", "DEPTH", "LOW_CUT", "HIGH_CUT", "D_LEVEL", "E_LEVEL"],
            "REVERB": ["TIME", "PRE_DELAY", "DENSITY", "LOW_CUT", "HIGH_CUT", "D_LEVEL", "E_LEVEL"],
            "GATE REVERB": ["TIME", "PRE_DELAY", "THRESHOLD", "LOW_CUT", "HIGH_CUT", "D_LEVEL", "E_LEVEL"],
            "REVERSE REVERB": ["TIME", "PRE_DELAY", "GATE_DELAY", "LOW_CUT", "HIGH_CUT", "D_LEVEL", "E_LEVEL"],
            "BEAT SCATTER": ["TYPE", "LENGTH"],
            "BEAT REPEAT": ["TYPE", "LENGTH"],
            "BEAT SHIFT": ["TYPE", "SHIFT"],
            "VINYL FLICK": ["FLICK"]
        };

        const SEQUENCER_PARAMETERS = [
            "SW", "SYNC", "RETRIG", "TARGET", "SEQ RATE", "SEQ MAX", 
            "SEQ VAL1", "SEQ VAL2", "SEQ VAL3", "SEQ VAL4", "SEQ VAL5", "SEQ VAL6", 
            "SEQ VAL7", "SEQ VAL8", "SEQ VAL9", "SEQ VAL10", "SEQ VAL11", "SEQ VAL12", 
            "SEQ VAL13", "SEQ VAL14", "SEQ VAL15", "SEQ VAL16"
        ];

        const SEQUENCER_EFFECTS = [
            "LPF", "HPF", "BPF", "PHASER", "FLANGER", "SYNTH", "RING MOD", 
            "TRANSPOSE", "PITCH BEND", "OSC BOT", "ISOLATOR", "OCTAVE", 
            "MANUAL PAN", "TREMOLO", "VIBRATO"
        ];

        const TRACK_FX_ONLY = ["BEAT SCATTER", "BEAT REPEAT", "BEAT SHIFT", "VINYL FLICK"];
        
        const ALL_EFFECTS = Object.keys(EFFECT_PARAMETERS);
        const INPUT_FX_LIST = ALL_EFFECTS.filter(fx => !TRACK_FX_ONLY.includes(fx));
        const TRACK_FX_LIST = ALL_EFFECTS;

        // --- Custom Hook for LocalStorage ---
        function useLocalStorage(key, initialValue) {
            const [storedValue, setStoredValue] = useState(() => {
                try {
                    const item = window.localStorage.getItem(key);
                    return item ? JSON.parse(item) : initialValue;
                } catch (error) {
                    console.error(error);
                    return initialValue;
                }
            });

            const setValue = (value) => {
                try {
                    const valueToStore = value instanceof Function ? value(storedValue) : value;
                    setStoredValue(valueToStore);
                    window.localStorage.setItem(key, JSON.stringify(valueToStore));
                } catch (error) {
                    console.error(error);
                }
            };

            return [storedValue, setValue];
        }

        // --- Components ---

        function PresetItem({ preset, onDelete }) {
            const [isExpanded, setIsExpanded] = useState(false);

            return (
                <li className="preset-item">
                    <div className="preset-summary" onClick={() => setIsExpanded(!isExpanded)}>
                        <div>
                            <strong>{preset.name}</strong> ({preset.type})
                        </div>
                        <div className="preset-actions">
                            <button onClick={(e) => { e.stopPropagation(); onDelete(preset.id); }} className="delete-button">削除</button>
                            <span>{isExpanded ? '閉じる' : '開く'}</span>
                        </div>
                    </div>
                    {isExpanded && (
                        <div className="preset-details">
                            {Object.entries(preset.slots).map(([slotId, slotData]) => (
                                slotData.effect && (
                                    <div key={slotId} className="detail-slot">
                                        <h4>FX {slotId}: {slotData.effect}</h4>
                                        <ul className="param-list">
                                            {Object.entries(slotData.params)
                                                .filter(([, value]) => value.trim() !== '')
                                                .map(([param, value]) => (
                                                    <li key={param}>
                                                        <span>{param}:</span> {value}
                                                    </li>
                                                ))}
                                        </ul>
                                    </div>
                                )
                            ))}
                        </div>
                    )}
                </li>
            );
        }

        function PresetList({ presets, onFilter, onDelete }) {
            const [searchTerm, setSearchTerm] = useState('');

            const handleSearchChange = (e) => {
                setSearchTerm(e.target.value);
                onFilter(e.target.value);
            };

            const presetsToShow = searchTerm ? presets : presets.sort((a, b) => b.id - a.id);


            return (
                <div className="list-container">
                    <h2>保存済みプリセット</h2>
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="プリセット名で検索..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                    </div>
                    {presets.length === 0 && searchTerm.length > 0 ? (
                        <p>検索に一致するプリセットがありません。</p>
                    ) : presets.length === 0 && searchTerm.length === 0 ? (
                         <p>プリセットはまだ保存されていません。上で作成してください！</p>
                    ) : (
                        <ul className="preset-list">
                            {presetsToShow.map(p => (
                                <PresetItem 
                                    key={p.id}
                                    preset={p}
                                    onDelete={onDelete}
                                />
                            ))}
                        </ul>
                    )}
                </div>
            );
        }

        function EffectSlot({ slotId, availableEffects, slotData, onSlotChange }) {
            const { effect, params } = slotData;

            const handleEffectChange = (e) => {
                const newEffect = e.target.value;
                const newParams = {};
                const baseParams = EFFECT_PARAMETERS[newEffect] || [];
                const seqParams = SEQUENCER_EFFECTS.includes(newEffect) ? SEQUENCER_PARAMETERS : [];
                [...baseParams, ...seqParams].forEach(p => {
                    newParams[p] = '';
                });
                onSlotChange(slotId, { effect: newEffect, params: newParams });
            };

            const handleParamChange = (paramName, value) => {
                const newParams = { ...params, [paramName]: value };
                onSlotChange(slotId, { effect, params: newParams });
            };

            const baseParams = useMemo(() => EFFECT_PARAMETERS[effect] || [], [effect]);
            const seqParams = useMemo(() => SEQUENCER_EFFECTS.includes(effect) ? SEQUENCER_PARAMETERS : [], [effect]);
            const seqParamsTop = useMemo(() => seqParams.slice(0, 6), [seqParams]);
            const seqParamsGrid = useMemo(() => seqParams.slice(6), [seqParams]);


            return (
                <div className="effect-slot">
                    <label>FX {slotId}</label>
                    <select value={effect || ''} onChange={handleEffectChange}>
                        <option value="">-- エフェクトを選択 --</option>
                        {availableEffects.map(fx => <option key={fx} value={fx}>{fx}</option>)}
                    </select>

                    {effect && baseParams.length > 0 && (
                        <div className="param-grid">
                            {baseParams.map(paramName => (
                                <div key={paramName} className="param-input">
                                    <label>{paramName}</label>
                                    <input
                                        type="text"
                                        value={params[paramName] || ''}
                                        onChange={(e) => handleParamChange(paramName, e.target.value)}
                                    />
                                </div>
                            ))}
                        </div>
                    )}

                    {effect && seqParams.length > 0 && (
                        <>
                            <hr className="param-divider" />
                            <div className="param-grid">
                                {seqParamsTop.map(paramName => (
                                    <div key={paramName} className="param-input">
                                        <label>{paramName}</label>
                                        <input
                                            type="text"
                                            value={params[paramName] || ''}
                                            onChange={(e) => handleParamChange(paramName, e.target.value)}
                                        />
                                    </div>
                                ))}
                            </div>
                            <div className="param-grid" style={{marginTop: '0.75rem'}}>
                                {seqParamsGrid.map(paramName => (
                                    <div key={paramName} className="param-input">
                                        <label>{paramName}</label>
                                        <input
                                            type="text"
                                            value={params[paramName] || ''}
                                            onChange={(e) => handleParamChange(paramName, e.target.value)}
                                        />
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            );
        }

        function PresetForm({ onSave }) {
            const [presetName, setPresetName] = useState('');
            const [presetType, setPresetType] = useState('TRACK FX');
            const [fxSlots, setFxSlots] = useState({
                A: { effect: null, params: {} },
                B: { effect: null, params: {} },
                C: { effect: null, params: {} },
                D: { effect: null, params: {} },
            });

            const availableEffects = useMemo(() => {
                return presetType === 'INPUT FX' ? INPUT_FX_LIST : TRACK_FX_LIST;
            }, [presetType]);
            
            useEffect(() => {
                // Reset slots if type changes and selected effect is not available
                const newSlots = { ...fxSlots };
                let changed = false;
                for (const slotId in newSlots) {
                    const effect = newSlots[slotId].effect;
                    if (effect && !availableEffects.includes(effect)) {
                        newSlots[slotId] = { effect: null, params: {} };
                        changed = true;
                    }
                }
                if (changed) {
                    setFxSlots(newSlots);
                }
            }, [presetType, availableEffects]);


            const handleSlotChange = (slotId, newSlotData) => {
                setFxSlots(prev => ({ ...prev, [slotId]: newSlotData }));
            };

            const handleSave = () => {
                const presetData = {
                    name: presetName,
                    type: presetType,
                    slots: fxSlots
                };
                onSave(presetData);
                // Reset form
                setPresetName('');
                setPresetType('TRACK FX');
                setFxSlots({
                    A: { effect: null, params: {} },
                    B: { effect: null, params: {} },
                    C: { effect: null, params: {} },
                    D: { effect: null, params: {} },
                });
            };
            
            const isSaveDisabled = !presetName.trim() || Object.values(fxSlots).every(slot => !slot.effect);

            return (
                <div className="form-container">
                    <h2>新規プリセット作成</h2>
                    <div className="form-group">
                        <label>プリセット種別</label>
                        <div className="radio-group">
                            <label>
                                <input
                                    type="radio"
                                    value="INPUT FX"
                                    checked={presetType === 'INPUT FX'}
                                    onChange={(e) => setPresetType(e.target.value)}
                                />
                                INPUT FX
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    value="TRACK FX"
                                    checked={presetType === 'TRACK FX'}
                                    onChange={(e) => setPresetType(e.target.value)}
                                />
                                TRACK FX
                            </label>
                        </div>
                    </div>

                    <div className="slots-container">
                        {['A', 'B', 'C', 'D'].map(slotId => (
                            <EffectSlot
                                key={slotId}
                                slotId={slotId}
                                availableEffects={availableEffects}
                                slotData={fxSlots[slotId]}
                                onSlotChange={handleSlotChange}
                            />
                        ))}
                    </div>
                    
                    <div className="save-section">
                        <div className="form-group">
                            <label>プリセット名</label>
                            <input
                                type="text"
                                value={presetName}
                                onChange={(e) => setPresetName(e.target.value)}
                                placeholder="例: イントロメロディ用FX"
                            />
                        </div>
                        <button onClick={handleSave} disabled={isSaveDisabled} className="save-button">
                            プリセットを保存
                        </button>
                    </div>
                </div>
            );
        }


        // --- Main App Component ---
        function App() {
            const [presets, setPresets] = useLocalStorage('rc505-presets', []);
            const [searchTerm, setSearchTerm] = useState('');

            const handleSavePreset = (newPreset) => {
                const presetWithId = { ...newPreset, id: Date.now() };
                setPresets(prevPresets => [...prevPresets, presetWithId]);
            };

            const handleDeletePreset = (idToDelete) => {
                if (window.confirm('このプリセットを削除してもよろしいですか？')) {
                    setPresets(prevPresets => prevPresets.filter(p => p.id !== idToDelete));
                }
            };

            const filteredPresets = useMemo(() => {
                return presets.filter(p => 
                    p.name.toLowerCase().includes(searchTerm.toLowerCase())
                );
            }, [presets, searchTerm]);

            return (
                <div>
                    <h1>RC505mk2 エフェクトメモ</h1>
                    <div className="main-content">
                        <PresetForm onSave={handleSavePreset} />
                        <PresetList 
                            presets={filteredPresets} 
                            onFilter={setSearchTerm}
                            onDelete={handleDeletePreset}
                        />
                    </div>
                </div>
            );
        }

        // --- Render the App ---
        const container = document.getElementById('root');
        const root = ReactDOM.createRoot(container);
        root.render(<App />);