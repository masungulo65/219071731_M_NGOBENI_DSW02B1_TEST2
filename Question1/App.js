import React, { useEffect, useState } from 'react';

import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';

import {
  collection,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from 'firebase/firestore';

import { db } from './firebaseConfig';

import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // =====================================================
  // 1.1 REAL-TIME FIRESTORE LISTENER
  // =====================================================

  useEffect(() => {
    const tasksCollection = collection(db, 'tasks');

    const unsubscribe = onSnapshot(
      tasksCollection,

      (snapshot) => {
        const taskList = snapshot.docs.map((taskDocument) => ({
          id: taskDocument.id,
          ...taskDocument.data(),
        }));

        setTasks(taskList);
        setLoading(false);
        setError('');
      },

      (firestoreError) => {
        console.error(
          'Firestore Listener Error:',
          firestoreError
        );

        setError(
          'Unable to load tasks from Firestore.'
        );

        setLoading(false);
      }
    );

    // Unsubscribe when component unmounts
    return () => unsubscribe();
  }, []);

  // =====================================================
  // 1.2 ADD TASK TO FIRESTORE
  // =====================================================

  const addTask = async (title, moduleCode, priority) => {
    try {
      setError('');

      await addDoc(
        collection(db, 'tasks'),
        {
          title: title.trim(),

          moduleCode: moduleCode
            .trim()
            .toUpperCase(),

          priority: priority,

          completed: false,

          createdAt: serverTimestamp(),
        }
      );

      return true;
    } catch (firestoreError) {
      console.error(
        'Add Task Error:',
        firestoreError
      );

      setError('Failed to add task.');

      Alert.alert(
        'Error',
        'The task could not be added to Firestore.'
      );

      return false;
    }
  };

  // =====================================================
  // 1.3 COMPLETE / RE-OPEN TASK
  // =====================================================

  const toggleComplete = async (task) => {
    try {
      setError('');

      const taskReference = doc(
        db,
        'tasks',
        task.id
      );

      await updateDoc(
        taskReference,
        {
          completed: !task.completed,
        }
      );

      /*
        Do NOT update the local tasks array here.

        Firestore is the source of truth.

        The onSnapshot listener will automatically
        receive the updated task.
      */
    } catch (firestoreError) {
      console.error(
        'Update Error:',
        firestoreError
      );

      setError('Failed to update task.');

      Alert.alert(
        'Error',
        'Could not update the task.'
      );
    }
  };

  // =====================================================
  // 1.4 DELETE TASK
  // =====================================================

  const deleteTask = async (taskId) => {
    try {
      setError('');

      // Delete the correct Firestore document
      await deleteDoc(
        doc(db, 'tasks', taskId)
      );

      /*
        Do not manually remove the task from
        the local list.

        The onSnapshot listener will update
        the UI automatically.
      */
    } catch (firestoreError) {
      console.error(
        'Error deleting task:',
        firestoreError
      );

      setError('Failed to delete task.');

      Alert.alert(
        'Delete Failed',
        'The task could not be deleted.'
      );
    }
  };

  // =====================================================
  // 1.5 RELIABILITY AND INTERFACE STATES
  // =====================================================

  // Show loading state while the first Firestore
  // snapshot is being established
  if (loading) {
    return (
      <SafeAreaView style={styles.centerContainer}>
        <ActivityIndicator
          size="large"
          color="#1565C0"
        />

        <Text style={styles.loadingText}>
          Loading tasks...
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>

      <Text style={styles.heading}>
        Student Task Hub
      </Text>

      {/* =================================================
          1.2 ADD TASK FORM
      ================================================= */}

      <TaskForm
        onAddTask={addTask}
      />

      {/* =================================================
          1.5 ERROR STATE
      ================================================= */}

      {error !== '' && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>
            {error}
          </Text>
        </View>
      )}

      <Text style={styles.sectionHeading}>
        My Tasks
      </Text>

      {/* =================================================
          1.5 EMPTY STATE
      ================================================= */}

      {tasks.length === 0 ? (
        <View style={styles.emptyContainer}>

          <Text style={styles.emptyTitle}>
            No Tasks
          </Text>

          <Text style={styles.emptyText}>
            There are currently no academic tasks.
          </Text>

          <Text style={styles.emptyText}>
            Add your first task above.
          </Text>

        </View>
      ) : (

        /* ===============================================
           1.6 REUSABLE TASK LIST
        =============================================== */

        <TaskList
          tasks={tasks}
          onToggle={toggleComplete}
          onDelete={deleteTask}
        />

      )}

    </SafeAreaView>
  );
}

// =====================================================
// 1.5 RELIABILITY AND INTERFACE STATE STYLING
// =====================================================

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    paddingHorizontal: 16,
    paddingTop: 20,
  },

  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1565C0',
    textAlign: 'center',
    marginBottom: 20,
  },

  sectionHeading: {
    fontSize: 21,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 12,
  },

  // ===================================================
  // 1.5 LOADING STATE STYLES
  // ===================================================

  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F7FA',
  },

  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#555555',
  },

  // ===================================================
  // 1.5 ERROR STATE STYLES
  // ===================================================

  errorContainer: {
    backgroundColor: '#FFEBEE',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },

  errorText: {
    color: '#C62828',
    fontSize: 14,
    textAlign: 'center',
  },

  // ===================================================
  // 1.5 EMPTY STATE STYLES
  // ===================================================

  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  emptyTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 10,
  },

  emptyText: {
    fontSize: 15,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 5,
  },

});