/**
 * Cache Github-REST-API request result use sessionStorage
 * @param path {string} request path
 * @returns R
 */
export function Request_Github_REST_API<R>(path: string) {
  return new Promise<R | null>(async (resolve) => {
    try {
      const key = window.btoa(path);
      const CacheData = sessionStorage.getItem(key);
      if (CacheData) resolve(JSON.parse(CacheData) as R);
      else {
        const data: R = await fetch(path).then(async (res) => {
          const value = await res.json();
          if (res.status !== 200) {
            console.log(value.message);
            return null;
          }
          return value;
        });
        if (data) sessionStorage.setItem(key, JSON.stringify(data));
        resolve(data);
      }
    } catch (error) {
      resolve(null);
      console.log((error as { message: string }).message);
    }
  });
}

/**
 * label list
 * @returns
 */
export function GetReposLabels<R>() {
  return Request_Github_REST_API<R>(
    "https://api.github.com/repos/kangduu/en/labels"
  );
}

/**
 * issue list
 * @param label {string}
 * @returns
 */
export function GetReposIssues<R>(label: string) {
  return Request_Github_REST_API<R>(
    `https://api.github.com/repos/kangduu/en/issues?labels=${label}&state=open&sort=updated`
  );
}
