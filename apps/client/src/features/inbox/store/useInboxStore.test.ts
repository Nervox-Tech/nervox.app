import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useInboxStore } from './useInboxStore';
import { act } from 'react';

// Mock URL.createObjectURL
globalThis.URL.createObjectURL = vi.fn(() => 'mock-url');

describe('useInboxStore', () => {
    // Reset store before each test
    beforeEach(() => {
        useInboxStore.setState({
            activeThreadId: '1',
            isEditingDraft: false,
            drafts: {},
            attachments: {},
            mobileView: 'list',
            // Reset messages to initial state if needed, but setState does shallow merge. 
            // Better to strictly reset if modifying arrays.
        });
    });

    it('should initialize with default values', () => {
        const state = useInboxStore.getState();
        expect(state.activeThreadId).toBe('1');
        expect(state.mobileView).toBe('list');
        expect(state.threads).toHaveLength(3); // Assuming MOCK_THREADS has 3 items
    });

    it('should set active thread and switch to thread view', () => {
        const { setActiveThreadId } = useInboxStore.getState();

        act(() => {
            setActiveThreadId('2');
        });

        const state = useInboxStore.getState();
        expect(state.activeThreadId).toBe('2');
        expect(state.mobileView).toBe('thread');
        expect(state.isEditingDraft).toBe(false);
    });

    it('should set mobile view', () => {
        const { setMobileView } = useInboxStore.getState();

        act(() => {
            setMobileView('thread');
        });

        expect(useInboxStore.getState().mobileView).toBe('thread');
    });

    it('should set draft content', () => {
        const { setDraft } = useInboxStore.getState();

        act(() => {
            setDraft('1', 'Hello draft');
        });

        expect(useInboxStore.getState().drafts['1']).toBe('Hello draft');
    });

    it('should add and remove attachments', () => {
        const { addAttachment, removeAttachment } = useInboxStore.getState();
        const file = new File(['content'], 'test.txt', { type: 'text/plain' });

        act(() => {
            addAttachment('1', [file]);
        });

        expect(useInboxStore.getState().attachments['1']).toHaveLength(1);
        expect(useInboxStore.getState().attachments['1'][0].name).toBe('test.txt');

        act(() => {
            removeAttachment('1', 0);
        });

        expect(useInboxStore.getState().attachments['1']).toHaveLength(0);
    });

    it('should send a message and clear drafts/attachments', () => {
        const { sendMessage, setDraft, addAttachment } = useInboxStore.getState();
        const file = new File(['img'], 'image.png', { type: 'image/png' });

        // Setup draft and attachment
        act(() => {
            setDraft('1', 'New message text');
            addAttachment('1', [file]);
        });

        act(() => {
            sendMessage('1', 'New message text');
        });

        const state = useInboxStore.getState();
        const messages = state.messages['1'];
        const lastMessage = messages[messages.length - 1];

        // Verify message added
        expect(lastMessage.text).toBe('New message text');
        expect(lastMessage.isMe).toBe(true);
        expect(lastMessage.attachments).toBeDefined();
        expect(lastMessage.attachments!).toHaveLength(1);
        expect(lastMessage.attachments![0].type).toBe('image');
        expect(lastMessage.attachments![0].url).toBe('mock-url');

        // Verify cleanup
        expect(state.drafts['1']).toBe('');
        expect(state.attachments['1']).toHaveLength(0);
        expect(state.isEditingDraft).toBe(false);
    });
});
