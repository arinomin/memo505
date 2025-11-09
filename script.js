const {useState, useEffect, useMemo} = React;

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
    "RINGMOD": ["FREQUENCY", "BALANCE", "MODE"],
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
    "STEP SLICER": ["RATE", "DEPTH", "THRESHOLD", "GAIN", "STEP MAX"],
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

function PresetItem({preset, onDelete, onEdit, onDuplicate}) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <li className="preset-item">
            <div className="preset-summary" onClick={() => setIsExpanded(!isExpanded)}>
                <div>
                    <strong>{preset.name}</strong> ({preset.type})
                </div>
                <div className="preset-actions">
                    <button onClick={(e) => {e.stopPropagation(); onDuplicate(preset);}} className="button button-sm duplicate-button">複製</button>
                    <button onClick={(e) => {e.stopPropagation(); onEdit(preset);}} className="button button-sm edit-button">編集</button>
                    <button onClick={(e) => {e.stopPropagation(); onDelete(preset.id);}} className="button button-sm delete-button">削除</button>
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
                                        .filter(([, value]) => String(value).trim() !== '')
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

function PresetList({presets, onFilter, onDelete, onEdit, onDuplicate, onExport, onImport}) {
    const [searchTerm, setSearchTerm] = useState('');
    const importInputRef = React.useRef(null);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        onFilter(e.target.value);
    };

    const handleImportClick = () => {
        // Trigger the hidden file input
        importInputRef.current.click();
    };

    const handleFileChange = (e) => {
        onImport(e);
        // Reset the input value to allow importing the same file again
        e.target.value = null;
    };

    const presetsToShow = searchTerm ? presets : presets.sort((a, b) => b.id - a.id);


    return (
        <div className="list-container">
            <div className="list-header">
                <h2>保存済みプリセット</h2>
                <div className="io-buttons">
                    <input
                        type="file"
                        ref={importInputRef}
                        style={{display: 'none'}}
                        accept=".json"
                        onChange={handleFileChange}
                    />
                    <label onClick={handleImportClick} className="import-button-label">インポート</label>
                    <button onClick={onExport} className="button button-sm export-button">エクスポート</button>
                </div>
            </div>
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
                                    onEdit={onEdit}
                                    onDuplicate={onDuplicate}
                                />
                            ))}
                        </ul>
                    )}
        </div>
    );
}

function EffectSlot({slotId, availableEffects, slotData, onSlotChange}) {
    const {effect, params} = slotData;

    const handleEffectChange = (e) => {
        const newEffect = e.target.value;
        const newParams = {};
        
        // Set base parameters
        const baseParams = EFFECT_PARAMETERS[newEffect] || [];
        baseParams.forEach(p => {
            newParams[p] = '';
        });

        // Set sequencer parameters if applicable
        if (SEQUENCER_EFFECTS.includes(newEffect)) {
            const seqParams = SEQUENCER_PARAMETERS;
            let seqValDefault = 0;
            if (newEffect === "TRANSPOSE") seqValDefault = -12;
            else if (newEffect === "OSC BOT") seqValDefault = "C1";
            else if (newEffect === "MANUAL PAN") seqValDefault = "L50";

            seqParams.forEach(p => {
                if (['SW', 'SYNC', 'RETRIG'].includes(p)) {
                    newParams[p] = 'OFF';
                } else if (p.startsWith('SEQ VAL')) {
                    newParams[p] = seqValDefault;
                } else {
                    newParams[p] = '';
                }
            });
        }

        // Special handling for STEP SLICER
        if (newEffect === "STEP SLICER") {
            for (let i = 1; i <= 16; i++) {
                newParams[`STEP LEN${i}`] = 50;
                newParams[`STEP LVL${i}`] = 100;
            }
        }
        
        onSlotChange(slotId, {effect: newEffect, params: newParams});
    };

    const handleParamChange = (paramName, value) => {
        const newParams = {...params, [paramName]: value};
        onSlotChange(slotId, {effect, params: newParams});
    };

    const baseParams = useMemo(() => EFFECT_PARAMETERS[effect] || [], [effect]);
    const seqParams = useMemo(() => SEQUENCER_EFFECTS.includes(effect) ? SEQUENCER_PARAMETERS : [], [effect]);
    const seqParamsTop = useMemo(() => seqParams.slice(0, 6), [seqParams]);
    const seqParamsGrid = useMemo(() => seqParams.slice(6), [seqParams]);


    const getSeqValOptions = (effect) => {
        const options = [];
        switch (effect) {
            case "TRANSPOSE":
                for (let i = -12; i <= 12; i++) options.push(<option key={i} value={i}>{i > 0 ? `+${i}` : i}</option>);
                break;
            case "OSC BOT":
                const notes = ["C", "D♭", "D", "E♭", "E", "F", "G♭", "G", "A♭", "A", "B♭", "B"];
                for (let oct = 1; oct <= 9; oct++) {
                    for (const note of notes) {
                        const val = `${note}${oct}`;
                        options.push(<option key={val} value={val}>{val}</option>);
                        if (val === "G9") break;
                    }
                }
                break;
            case "MANUAL PAN":
                for (let i = -50; i <= 50; i++) {
                    let val;
                    if (i === 0) val = "CENTER";
                    else if (i < 0) val = `L${Math.abs(i)}`;
                    else val = `R${i}`;
                    options.push(<option key={val} value={val}>{val}</option>);
                }
                break;
            default: // For HPF, LPF, BPF, etc.
                for (let i = 0; i <= 100; i++) options.push(<option key={i} value={i}>{i}</option>);
                break;
        }
        return options;
    };

    const isSeqValEffect = SEQUENCER_EFFECTS.includes(effect);
    const seqValOptions = isSeqValEffect ? getSeqValOptions(effect) : null;

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
                        {seqParamsTop.map(paramName => {
                            if (['SW', 'SYNC', 'RETRIG'].includes(paramName)) {
                                return (
                                    <div key={paramName} className="param-input">
                                        <label>{paramName}</label>
                                        <select
                                            value={params[paramName] || 'OFF'}
                                            onChange={(e) => handleParamChange(paramName, e.target.value)}
                                        >
                                            <option value="OFF">OFF</option>
                                            <option value="ON">ON</option>
                                        </select>
                                    </div>
                                );
                            }
                            return (
                                <div key={paramName} className="param-input">
                                    <label>{paramName}</label>
                                    <input
                                        type="text"
                                        value={params[paramName] || ''}
                                        onChange={(e) => handleParamChange(paramName, e.target.value)}
                                    />
                                </div>
                            );
                        })}
                    </div>
                    <div className="param-grid" style={{marginTop: '0.75rem'}}>
                        {seqParamsGrid.map(paramName => (
                             <div key={paramName} className="param-input">
                                <label>{paramName}</label>
                                {isSeqValEffect ? (
                                    <select
                                        value={params[paramName] || ''}
                                        onChange={(e) => handleParamChange(paramName, e.target.value)}
                                    >
                                        {seqValOptions}
                                    </select>
                                ) : (
                                    <input
                                        type="text"
                                        value={params[paramName] || ''}
                                        onChange={(e) => handleParamChange(paramName, e.target.value)}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                </>
            )}

            {effect === "STEP SLICER" && (
                <>
                    <hr className="param-divider" />
                    <h4>STEP LEN (0-100, 初期値: 50)</h4>
                    <div className="param-grid">
                        {Array.from({length: 16}, (_, i) => `STEP LEN${i + 1}`).map(paramName => (
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
                    <h4>STEP LVL (0-100, 初期値: 100)</h4>
                    <div className="param-grid" style={{marginTop: '0.75rem'}}>
                        {Array.from({length: 16}, (_, i) => `STEP LVL${i + 1}`).map(paramName => (
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

function PresetForm({onSave, editingPreset, onCancelEdit}) {
    const [presetName, setPresetName] = useState('');
    const [presetType, setPresetType] = useState('INPUT FX');
    const [fxSlots, setFxSlots] = useState({
        A: {effect: null, params: {}},
        B: {effect: null, params: {}},
        C: {effect: null, params: {}},
        D: {effect: null, params: {}},
    });

    const isEditing = editingPreset && editingPreset.id;
    const isDuplicating = editingPreset && !editingPreset.id;

    useEffect(() => {
        if (editingPreset) {
            setPresetName(editingPreset.name || '');
            setPresetType(editingPreset.type || 'INPUT FX');
            // Deep copy slots to avoid direct state mutation
            setFxSlots(JSON.parse(JSON.stringify(editingPreset.slots || {
                A: {effect: null, params: {}},
                B: {effect: null, params: {}},
                C: {effect: null, params: {}},
                D: {effect: null, params: {}},
            })));
        } else {
            // Reset form to initial state
            setPresetName('');
            setPresetType('INPUT FX');
            setFxSlots({
                A: {effect: null, params: {}},
                B: {effect: null, params: {}},
                C: {effect: null, params: {}},
                D: {effect: null, params: {}},
            });
        }
    }, [editingPreset]);


    const availableEffects = useMemo(() => {
        return presetType === 'INPUT FX' ? INPUT_FX_LIST : TRACK_FX_LIST;
    }, [presetType]);

    useEffect(() => {
        // Reset slots if type changes and selected effect is not available
        const newSlots = {...fxSlots};
        let changed = false;
        for (const slotId in newSlots) {
            const effect = newSlots[slotId].effect;
            if (effect && !availableEffects.includes(effect)) {
                newSlots[slotId] = {effect: null, params: {}};
                changed = true;
            }
        }
        if (changed) {
            setFxSlots(newSlots);
        }
    }, [presetType, availableEffects]);


    const handleSlotChange = (slotId, newSlotData) => {
        setFxSlots(prev => ({...prev, [slotId]: newSlotData}));
    };

    const handleSave = () => {
        const presetData = {
            id: isEditing ? editingPreset.id : null, // Pass ID if editing
            name: presetName,
            type: presetType,
            slots: fxSlots
        };
        onSave(presetData);
    };

    const isSaveDisabled = !presetName.trim() || Object.values(fxSlots).every(slot => !slot.effect);

    const getTitle = () => {
        if (isEditing) return 'プリセットを編集';
        if (isDuplicating) return 'プリセットを複製';
        return '新規プリセット作成';
    }

    return (
        <div className="form-container">
            <h2>{getTitle()}</h2>
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
                <button onClick={handleSave} disabled={isSaveDisabled} className="button save-button">
                    {isEditing ? '更新' : 'プリセットを保存'}
                </button>
                {editingPreset && (
                    <button onClick={onCancelEdit} className="button cancel-button">
                        キャンセル
                    </button>
                )}
            </div>
        </div>
    );
}


// --- Main App Component ---
function App() {
    const [presets, setPresets] = useLocalStorage('rc505-presets', []);
    const [searchTerm, setSearchTerm] = useState('');
    const [presetForForm, setPresetForForm] = useState(null); // For editing or duplicating

    const handleSavePreset = (presetData) => {
        if (presetData.id) {
            // Update existing preset
            setPresets(prev => prev.map(p => p.id === presetData.id ? presetData : p));
        } else {
            // Save new preset
            const presetWithId = {...presetData, id: Date.now()};
            setPresets(prev => [...prev, presetWithId]);
        }
        setPresetForForm(null); // Clear form after saving
    };

    const handleDeletePreset = (idToDelete) => {
        if (window.confirm('このプリセットを削除してもよろしいですか？')) {
            setPresets(prevPresets => prevPresets.filter(p => p.id !== idToDelete));
        }
    };

    const handleEdit = (preset) => {
        setPresetForForm(preset);
        window.scrollTo(0, 0); // Scroll to top to see the form
    };

    const handleDuplicate = (preset) => {
        const duplicatedPreset = {...preset, id: null, name: `${preset.name} (コピー)`};
        setPresetForForm(duplicatedPreset);
        window.scrollTo(0, 0); // Scroll to top to see the form
    };

    const handleCancelEdit = () => {
        setPresetForForm(null);
    };

    const handleExportData = () => {
        if (presets.length === 0) {
            alert('エクスポートするプリセットがありません。');
            return;
        }
        const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
            JSON.stringify(presets, null, 2)
        )}`;
        const link = document.createElement("a");
        link.href = jsonString;
        const date = new Date();
        const formattedDate = `${date.getFullYear()}${(date.getMonth() + 1).toString().padStart(2, '0')}${date.getDate().toString().padStart(2, '0')}`;
        link.download = `rc505_presets_${formattedDate}.json`;
        link.click();
    };

    const handleImportData = (event) => {
        const fileReader = new FileReader();
        const file = event.target.files[0];

        if (!file) return;

        fileReader.readAsText(file, "UTF-8");
        fileReader.onload = e => {
            try {
                const importedPresets = JSON.parse(e.target.result);

                // Basic validation
                if (!Array.isArray(importedPresets)) {
                    throw new Error("JSONファイルはプリセットの配列である必要があります。");
                }

                if (window.confirm('現在のプリセットをインポートしたデータで上書きしますか？（現在のデータは失われます）')) {
                    setPresets(importedPresets);
                    alert('プリセットが正常にインポートされました。');
                }
            } catch (error) {
                alert(`インポートに失敗しました。
エラー: ${error.message}

有効なJSONファイルを選択してください。`);
            }
        };
    };

    const filteredPresets = useMemo(() => {
        return presets.filter(p =>
            p.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [presets, searchTerm]);

    return (
        <div>
            <h1>memo-505</h1>
            <div className="main-content">
                <PresetForm
                    onSave={handleSavePreset}
                    editingPreset={presetForForm}
                    onCancelEdit={handleCancelEdit}
                />
                <PresetList
                    presets={filteredPresets}
                    onFilter={setSearchTerm}
                    onDelete={handleDeletePreset}
                    onEdit={handleEdit}
                    onDuplicate={handleDuplicate}
                    onExport={handleExportData}
                    onImport={handleImportData}
                />
            </div>
        </div>
    );
}

// --- Render the App ---
const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<App />);
