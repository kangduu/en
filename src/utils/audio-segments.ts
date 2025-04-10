//1. 混合所有声道数据（如果是立体声）
//2. 将音频分成多个时间窗口（默认每个窗口0.1秒）
//3. 计算每个窗口的RMS能量值
//4. 根据RMS阈值检测有声/静音段落
//5. 应用持续时间阈值过滤无效段落
//6. 返回符合条件的有声段落时间信息

// 辅助函数：混合所有声道
function mixDownChannels(audioBuffer: AudioBuffer) {
  if (audioBuffer.numberOfChannels === 1) {
    return audioBuffer.getChannelData(0);
  }

  const leftChannel = audioBuffer.getChannelData(0);
  const rightChannel = audioBuffer.getChannelData(1);
  const mixed = new Float32Array(leftChannel.length);

  for (let i = 0; i < leftChannel.length; i++) {
    mixed[i] = (leftChannel[i] + rightChannel[i]) / 2;
  }

  return mixed;
}

// 辅助函数：计算RMS能量
function calculateRMSValues(
  channelData: Float32Array<ArrayBufferLike>,
  sampleRate: number,
  windowSize: number
) {
  const samplesPerWindow = Math.floor(sampleRate * windowSize);
  const windowCount = Math.floor(channelData.length / samplesPerWindow);
  const rmsValues = new Float32Array(windowCount);

  for (let i = 0; i < windowCount; i++) {
    const startSample = i * samplesPerWindow;
    const endSample = startSample + samplesPerWindow;
    let sum = 0;

    for (let j = startSample; j < endSample; j++) {
      sum += channelData[j] * channelData[j];
    }

    rmsValues[i] = Math.sqrt(sum / samplesPerWindow);
  }

  return { rmsValues, samplesPerWindow };
}

// 辅助函数：从RMS值检测段落
function findSegmentsFromRMS(
  rmsValues: Float32Array<ArrayBuffer>,
  samplesPerWindow: number,
  sampleRate: number,
  rmsThreshold: number,
  minSilenceDuration: number,
  minSegmentDuration: number
) {
  const minSilenceWindows = Math.ceil(
    minSilenceDuration / (samplesPerWindow / sampleRate)
  );
  //   const minSegmentWindows = Math.ceil(
  //     minSegmentDuration / (samplesPerWindow / sampleRate)
  //   );

  const segments = [];
  let currentSegment = null;
  let silentWindowCount = 0;

  for (let i = 0; i < rmsValues.length; i++) {
    const isActive = rmsValues[i] > rmsThreshold;

    if (isActive) {
      silentWindowCount = 0;

      if (!currentSegment) {
        // 开始新段落
        currentSegment = {
          startWindow: i,
          endWindow: i,
          startTime: (i * samplesPerWindow) / sampleRate,
          endTime: (i * samplesPerWindow + samplesPerWindow) / sampleRate,
        };
      } else {
        // 更新当前段落
        currentSegment.endWindow = i;
        currentSegment.endTime =
          (i * samplesPerWindow + samplesPerWindow) / sampleRate;
      }
    } else {
      silentWindowCount++;

      if (currentSegment && silentWindowCount >= minSilenceWindows) {
        // 检查段落持续时间是否足够长
        const segmentDuration =
          currentSegment.endTime - currentSegment.startTime;
        if (segmentDuration >= minSegmentDuration) {
          segments.push({
            start: currentSegment.startTime,
            end: currentSegment.endTime,
            duration: segmentDuration,
          });
        }

        currentSegment = null;
      }
    }
  }

  // 添加最后一个段落（如果有）
  if (currentSegment) {
    const segmentDuration = currentSegment.endTime - currentSegment.startTime;
    if (segmentDuration >= minSegmentDuration) {
      segments.push({
        start: currentSegment.startTime,
        end: currentSegment.endTime,
        duration: segmentDuration,
      });
    }
  }

  return segments;
}

// 文件读取辅助函数
function readFileAsArrayBuffer(
  file: File
): Promise<string | ArrayBuffer | null> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsArrayBuffer(file);
  });
}

export interface AudioSplitOptions {
  rmsThreshold?: number; // RMS能量阈值
  minSilenceDuration?: number; // 最小静音持续时间(秒)
  minSegmentDuration?: number; // 最小有效段落持续时间(秒)
  windowSize?: number; // RMS分析窗口大小(秒)
}

export default async function detectAudioSegments(
  file: File,
  options: AudioSplitOptions = {}
) {
  // 默认参数
  const {
    rmsThreshold = 0.005, // RMS能量阈值
    minSilenceDuration = 0.5, // 最小静音持续时间(秒)
    minSegmentDuration = 0.1, // 最小有效段落持续时间(秒)
    windowSize = 0.05, // RMS分析窗口大小(秒)
  } = options;

  try {
    // 1. 读取并解码音频文件
    const arrayBuffer = (await readFileAsArrayBuffer(file)) as ArrayBuffer;
    const audioContext = new window.AudioContext();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

    // 2. 获取音频数据（混合所有声道）
    const mixedChannelData: Float32Array<ArrayBufferLike> =
      mixDownChannels(audioBuffer);
    const sampleRate: number = audioBuffer.sampleRate;

    // 3. 计算RMS能量
    const { rmsValues, samplesPerWindow } = calculateRMSValues(
      mixedChannelData,
      sampleRate,
      windowSize
    );

    // 4. 检测音频段落
    const segments = findSegmentsFromRMS(
      rmsValues,
      samplesPerWindow,
      sampleRate,
      rmsThreshold,
      minSilenceDuration,
      minSegmentDuration
    );

    return {
      segments,
      duration: audioBuffer.duration,
      sampleRate,
      sampleCount: mixedChannelData.length,
    };
  } catch (error) {
    throw error;
  }
}
