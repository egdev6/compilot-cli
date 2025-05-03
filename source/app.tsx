import type { DataProps } from '@models/app.js';
import { isWarning } from '@utils/functions.js';
import loadConfig from '@utils/load-config.js';
import { setupPlop } from '@utils/setup-plop.js';
import { Box } from 'ink';
import nodePlop from 'node-plop'; // Importa node-plop para usar la funcionalidad de generación
import React, { type FC, useEffect, useState } from 'react';
import Summary from './components/partials/Summary.js';
import FolderAtomicInput from './components/steps/FolderAtomicInput.js';
import FolderPageInput from './components/steps/FolderPageInput.js';
import HttpInput from './components/steps/HttpInput.js';
import NameInput from './components/steps/NameInput.js';
import NewAction from './components/steps/NewAction.js';
import StateInput from './components/steps/StateInput.js';
import TypeInput from './components/steps/TypeInput.js';

const defaultData = {
  name: '',
  type: '',
  http: '',
  state: '',
  folder: '',
  changes: undefined,
  errors: undefined,
  warnings: undefined,
  pascalName: '',
  kebabName: '',
  camelName: ''
};

const App: FC = () => {
  const [step, setStep] = useState('type');
  const [dataList, setDataList] = useState([] as DataProps[]);
  const [data, setData] = useState<DataProps>(defaultData);
  const [config, setConfig] = useState(undefined as any);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (!config) {
      const configuration = loadConfig();
      setConfig(configuration);
    }
  }, []);

  useEffect(() => {
    if (step === 'new') {
      setData(defaultData);
    }
  }, [step]);

  const next = async (key: string, value: string, nextStep: string | null) => {
    if (nextStep) {
      setData((prev) => ({ ...prev, [key]: value }));
      setStep(nextStep);
    } else {
      const updatedData = { ...data, [key]: value };
      const plop = await nodePlop();
      setupPlop(plop);
      const generator = plop.getGenerator('crear');
      const { changes, failures } = await generator.runActions(updatedData);
      const warnings = failures.filter(isWarning);
      const errors = failures.filter((f) => !isWarning(f));
      const changesTree = changes
        .filter((change) => change.type === 'add')
        .map((change) => change.path.replace(`${process.cwd()}/`, ''));
      setDataList([...dataList, { ...updatedData, changes: changesTree, errors, warnings }]);
      setStep('new');
    }
  };

  const renderFolderByType = (type: string) => {
    switch (type) {
      case 'page':
        return <FolderPageInput next={next} data={data} setData={setData} config={loadConfig()} />;
      case 'component':
        if (config.components.atomic) {
          return <FolderAtomicInput next={next} />;
        }
        next('folder', config?.components.base, null);
        return;
      case 'hook':
        next('folder', config.hooks.base, null);
        return;
      case 'service':
        next('folder', config.services.base, null);
        return;
      default:
        return null;
    }
  };

  return (
    <Box flexDirection='column'>
      <Summary dataList={dataList} data={data} />
      {step === 'type' && <TypeInput next={next} />}
      {step === 'name' && <NameInput next={next} data={data} setData={setData} config={config} />}
      {step === 'http' && <HttpInput next={next} data={data} />}
      {step === 'state' && <StateInput next={next} />}
      {step === 'folder' && renderFolderByType(data?.type || '')}
      {step === 'new' && <NewAction setStep={setStep} />}
    </Box>
  );
};

export default App;
