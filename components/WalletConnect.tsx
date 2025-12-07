import React from 'react';
import { WalletState } from '../types';

interface WalletConnectProps {
  wallet: WalletState;
  onConnect: () => void;
  isLoading: boolean;
}

const WalletConnect: React.FC<WalletConnectProps> = ({ wallet, onConnect, isLoading }) => {
  return (
    <div className="absolute top-4 right-4 z-50">
      {!wallet.isConnected ? (
        <button
          onClick={onConnect}
          disabled={isLoading}
          className={`
            border-2 border-white px-4 py-2 text-sm font-bold uppercase tracking-wider
            transition-all duration-300
            ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white hover:text-black active:scale-95'}
          `}
        >
          {isLoading ? '[ Đang kết nối... ]' : '[ Kết nối ví IOTA ]'}
        </button>
      ) : (
        <div className="flex flex-col items-end gap-1">
          <div className="flex items-center gap-2 border border-white px-3 py-1 bg-neutral-900">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs font-mono">{wallet.address?.slice(0, 6)}...{wallet.address?.slice(-4)}</span>
          </div>
          <span className="text-[10px] text-gray-400 font-mono">Move VM Connected</span>
        </div>
      )}
    </div>
  );
};

export default WalletConnect;